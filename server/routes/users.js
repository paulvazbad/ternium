const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/', async (req, res) => {
    console.log('Nueva Peticion!');
    const users = await User.find();
    res.send(users);
});

router.post('/login', async (req, res) => {
    console.log('Nueva Peticion!');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findOne({ username: req.body.username});
    if (!user) return res.status(404).send('The username was not found.');
    
    if (user.password !== req.body.password) return res.status(404).send('The password entered was not correct.');
    //console.log(res.header());
    res.set('Content-Type', 'application/json');
    console.log(res);
    res.send(user);
});

router.post('/', async (req, res) => {
    console.log('Nueva Peticion!');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({ 
        username: req.body.username,
        password: req.body.password
    });
    user = await user.save();

    res.send(user);
});

router.put('/:username', async (req, res) => {
    console.log('Nueva Peticion!');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOneAndUpdate({ username: req.params.username}, {
        $set: {
            username: req.body.username,
            password: req.body.password
        }
    }, {new: true})
    if (!user) return res.status(404).send('The username was not found.');

    res.send(user);
});

router.delete('/:username', async (req, res) => {
    console.log('Nueva Peticion!');
    const user = await User.findOneAndRemove({ username: req.params.username});
  
    if (!user) return res.status(404).send('The username was not found.');
  
    res.send(user);
  });

router.get('/:username', async (req, res) => {
    console.log('Nueva Peticion!');
    const user = await User.findOne({ username: req.params.username});
    if (!user) return res.status(404).send('The username was not found.');
  
    res.send(user);
  });

module.exports = router;