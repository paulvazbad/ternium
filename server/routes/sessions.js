const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Session, validate} = require('../models/session');
const {User} = require('../models/user'); 
const {Staff} = require('../models/staff'); 
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

router.delete('/:id', [ validateObjectId], async (req, res) => {
  const session = await Session.findByIdAndRemove(req.params.id);

  if (!session) return res.status(404).send('The session with the given ID was not found.');

  res.send(session);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) return res.status(404).send('The session with the given ID was not found.');

  res.send(session);
});

module.exports = router;