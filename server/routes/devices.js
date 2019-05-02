const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Device, validate} = require('../models/device');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const devices = await Device.find().sort('mac');
  res.send(devices);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let device = new Device({ mac: req.body.mac });
  device = await device.save();
  
  res.send(device);
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const device = await Device.findByIdAndUpdate(req.params.id, { mac: req.body.mac }, {
    new: true
  });

  if (!device) return res.status(404).send('The device with the given ID was not found.');
  
  res.send(device);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const device = await Device.findByIdAndRemove(req.params.id);

  if (!device) return res.status(404).send('The device with the given ID was not found.');

  res.send(device);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device) return res.status(404).send('The device with the given ID was not found.');

  res.send(device);
});

module.exports = router;