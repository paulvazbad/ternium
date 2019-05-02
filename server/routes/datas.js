const {Data} = require('../models/data');
const {Session} = require('../models/session') ;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Nueva Peticion!');
    const data = await Data.find();
    res.send(data);
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
        temperatura: req.body.temperatura
    });
    data = await data.save();
    console.log(data);
    
    await Session.findByIdAndUpdate(session._id,
        {   
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