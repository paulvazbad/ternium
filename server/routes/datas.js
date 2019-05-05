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
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        gasNatural: req.body.gasNatural,
        mac: req.body.mac,
        co2: req.body.co2,
        hidrogeno: req.body.hidrogeno,
        temperatura: req.body.temperatura,
        alertaBoton: req.body.alertaBoton,
        alertaMetrica: req.body.alertaMetrica,
        alertaCaida: req.body.alertaCaida,
    });
    data = await data.save();
    console.log(data);
    if (data.alertaBoton === true) {
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
                gps: {
                    longitud: data.longitud,
                    latitud: data.latitud
                },
                mac: session.mac                
            },
            type: 'Boton'
        });
        await alert.save();
    }

    if (data.alertaCaida === true) {
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
                gps: {
                    longitud: data.longitud,
                    latitud: data.latitud
                },
                mac: session.mac                
            },
            type: 'Caida'
        });
        await alert.save();
    }

    if (data.alertaMetrica !== '') {
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
                gps: {
                    longitud: data.longitud,
                    latitud: data.latitud
                },
                mac: session.mac,
                alertaMetrica: data.alertaMetrica               
            },
            type: 'Metrica' 
        });
        await alert.save();
    }
    await Session.findByIdAndUpdate(session._id,{   
        alertaBoton: data.alertaBoton,
        alertaMetrica: data.alertaMetrica,
        alertaCaida: data.alertaCaida, 
        data : {
            gasNatural: data.gasNatural,
            co2: data.co2,
            hidrogeno: data.hidrogeno,
            temperatura: data.temperatura
        },
        gps: {
            longitud: data.longitud,
            latitud: data.latitud
        }
    });

    res.send(data);
});


module.exports = router;