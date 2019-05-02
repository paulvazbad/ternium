const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Staff, validate} = require('../models/staff');
const {User} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const staffs = await Staff.find().sort('name');
  res.send(staffs);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({username: req.body.supervisor});
    if (!user) return res.status(400).send('Invalid user.');

    let staff = new Staff({
        name: req.body.name, 
        area: req.body.area,
        registrationId: req.body.registrationId,
        supervisor: {
            _id: user._id,
            name: user.name, 
            username: user.username
        }
    });

    staff = await staff.save();
    
    await user.team.push({
        _id: staff._id, 
        name: staff.name, 
        registrationId: staff.registrationId
    });
    user.save();

    res.send(staff);
});

router.put('/:id', [ validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({username: req.body.supervisor});
  if (!user) return res.status(400).send('Invalid user.');

  const staff = await Staff.findByIdAndUpdate(req.params.id, { 
    name: req.body.name, 
    area: req.body.area,
    registrationId: req.body.registrationId,
    supervisor: {
        _id: user._id,
        name: user.name, 
        username: user.username
    }
    }, { new: true });

  if (!staff) return res.status(404).send('The staff with the given ID was not found.');
  
  res.send(staff);
});

router.delete('/:id', [ validateObjectId], async (req, res) => {
  const staff = await Staff.findByIdAndRemove(req.params.id);

  if (!staff) return res.status(404).send('The staff with the given ID was not found.');

  res.send(staff);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const staff = await Staff.findById(req.params.id);

  if (!staff) return res.status(404).send('The staff with the given ID was not found.');

  res.send(staff);
});

module.exports = router;