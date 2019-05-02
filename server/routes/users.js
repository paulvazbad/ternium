const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send('User already registered.');

  user = new User (_.pick(req.body, ['name', 'username', 'password', 'area', 'rol', 'team']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  console.log(user);

  
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name', 'username', 'area', 'rol', 'team']));
});

router.get('/:id', async (req, res) => {
  const user = await User.findOne({username: req.params.id});
  if (!user) return res.status(404).send('The user with the given username was not found.');
  res.send(_.pick(user, ['name', 'username', 'team']));
});

module.exports = router; 
