const {Data} = require('../models/data');
const {Session} = require('../models/session') ;
const {Alert} = require('../models/alert') ;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Nueva Peticion!');
    const datas = await Data.find();
    res.send(datas);
});

router.post('/', async (req, res) => {
    console.log('Nueva Peticion!');

    let session = await Session.findOne({mac: req.body.mac});
    if (!session) return res.status(400).send('Session no activa.');

    let data = new Data({
        gasNatural: req.body.gasNatural,
        mac: req.body.mac,
        co2: req.body.co2,
        hidrogeno: req.body.hidrogeno,
        temperatura: req.body.temperatura,
        alert: req.body.alert
    });
    data = await data.save();
    console.log(data);
    // si alerta es true guardar en el historial de alertas
    if (data.alert === true) {
        let alert = new Alert({
            session: {
                initialDate: session.initialDate,
                supervisor: {
                    _id: session.supervisor._id,
                    name: session.supervisor.name,
                    username: session.supervisor.username
                },
                staff: {
                    _id: session.staff._id,
                    name: session.staff.name,
                    registrationId: session.staff.registrationId
                },
                data: {
                    gasNatural: data.gasNatural,
                    co2: data.co2,
                    hidrogeno: data.hidrogeno,
                    temperatura: data.temperatura
                },
                mac: session.mac                
            }
        });
        await alert.save();
    }
    await Session.findByIdAndUpdate(session._id,
        {   
            alert: data.alert,
            data : {
                gasNatural: data.gasNatural,
                co2: data.co2,
                hidrogeno: data.hidrogeno,
                temperatura: data.temperatura
            }
        });

    res.send(data);
});


module.exports = router;