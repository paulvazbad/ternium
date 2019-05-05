const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Session, validate} = require('../models/session');
const {User} = require('../models/user'); 
const {Staff} = require('../models/staff'); 
const {Data} = require('../models/data'); 
const {History} = require('../models/history'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const sessions = await Session.find().sort('initialDate');
  res.send(sessions);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({username: req.body.supervisor});
    if (!user) return res.status(400).send('Invalid user.');
    const staff = await Staff.findOne({registrationId: req.body.staff});
    if (!staff) return res.status(400).send('Invalid staff.');

    let session = new Session({
        supervisor: {
            _id: user._id,
            name: user.name, 
            username: user.username
        },
        staff: {
            _id: staff._id,
            name: staff.name, 
            registrationId: staff.registrationId
        },
        mac: req.body.mac
    });

    session = await session.save();

    res.send(session);
});

// router.put('/:id', [auth, validateObjectId], async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findOne({username: req.body.supervisor});
//   if (!user) return res.status(400).send('Invalid user.');

//   const staff = await Staff.findByIdAndUpdate(req.params.id, { 
//     name: req.body.name, 
//     area: req.body.area,
//     registrationId: req.body.registrationId,
//     supervisor: {
//         _id: user._id,
//         name: user.name, 
//         username: user.username
//     }
//     }, { new: true });

//   if (!staff) return res.status(404).send('The staff with the given ID was not found.');
  
//   res.send(staff);
// });

router.delete('/:id', [validateObjectId], async (req, res) => {
  const session = await Session.findByIdAndRemove(req.params.id);
  if (!session) return res.status(404).send('The session with the given ID was not found.');
  const datas = await Data.find({mac: session.mac});
  if (datas) {
    let hidrogenoArr = [datas[0].hidrogeno, datas[0].hidrogeno, datas[0].hidrogeno];
    let gasNaturalArr = [datas[0].gasNatural, datas[0].gasNatural, datas[0].gasNatural];
    let temperaturaArr = [datas[0].temperatura, datas[0].temperatura, datas[0].temperatura];
    let co2Arr = [datas[0].co2, datas[0].co2, datas[0].co2];

    getMinMaxAvg(datas, hidrogenoArr, gasNaturalArr, temperaturaArr, co2Arr);

    await Data.remove({mac: session.mac});
    
    let history = new History({
      idSesion: session._id,
      initialDate: session.initialDate,
      supervisor: {
        name: session.supervisor.name,
        username: session.supervisor.username
      },
      staff: {
          name: session.staff.name,
          registrationId: session.staff.registrationId
      },
      MAC: session.mac,
      GPS: {
        latitud: 0,
        longitud: 0
      },
      Data: {
        Hidrogeno: {
          Min: hidrogenoArr[0],
          Max: hidrogenoArr[1],
          Prom: hidrogenoArr[2]
        },
        CO: {
          Min: co2Arr[0],
          Max: co2Arr[1],
          Prom: co2Arr[2]
        },
        GasNatural: {
          Min: gasNaturalArr[0],
          Max: gasNaturalArr[1],
          Prom: gasNaturalArr[2]
        },
        Temperatura: {
          Min: temperaturaArr[0],
          Max: temperaturaArr[1],
          Prom: temperaturaArr[2]
        }
      },
    });
    await history.save();
  }

  res.send(session);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) return res.status(404).send('The session with the given ID was not found.');

  res.send(session);
});

function getMinMaxAvg(datas, hidrogenoArr, gasNaturalArr, temperaturaArr, co2Arr){
  for(var i = 1; i < datas.length; i++){
    //get min of hidrogeno
    if(datas[i].hidrogeno < hidrogenoArr[0]){
      hidrogenoArr[0] = datas[i].hidrogeno;
    }
    //get max of hidrogeno
    if(datas[i].hidrogeno > hidrogenoArr[0]){
      hidrogenoArr[1] = datas[i].hidrogeno;
    }
    //get avg of hidrogeno
    hidrogenoArr[2] += datas[i].hidrogeno;

    //get min of gasNatural
    if(datas[i].gasNatural < gasNaturalArr[0]){
      gasNaturalArr[0] = datas[i].gasNatural;
    }
    //get max of gasNatural
    if(datas[i].gasNatural > gasNaturalArr[0]){
      gasNaturalArr[1] = datas[i].gasNatural;
    }
    //get avg of gasNatural
    gasNaturalArr[2] += datas[i].gasNatural;

    //get min of temperatura
    if(datas[i].temperatura < temperaturaArr[0]){
      temperaturaArr[0] = datas[i].temperatura;
    }
    //get max of temperatura
    if(datas[i].temperatura > temperaturaArr[0]){
      temperaturaArr[1] = datas[i].temperatura;
    }
    //get avg of temperatura
    temperaturaArr[2] += datas[i].temperatura;

    //get min of co2
    if(datas[i].co2 < co2Arr[0]){
      co2Arr[0] = datas[i].co2;
    }
    //get max of co2
    if(datas[i].co2 > co2Arr[0]){
      co2Arr[1] = datas[i].co2;
    }
    //get avg of co2
    co2Arr[2] += datas[i].co2;

  }
  gasNaturalArr[2] /= datas.length;
  hidrogenoArr[2] /= datas.length;
  temperaturaArr[2] /= datas.length;
  co2Arr[2] /= datas.length;
}

module.exports = router;