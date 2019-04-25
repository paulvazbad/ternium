const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// router.get('/', async (req, res) => {
//     const users = await User
//         .find()
//         .sort('name')
//     res.send(users);
// });

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
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

// router.put('/:id', async (req, res) => {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findByIdAndUpdate(req.params.id, {
//         $set: {
//             name: req.body.name,
//             password: req.body.password,
//             username: req.body.username
//         }
//     }, { new: true });
//     if(!user) return res.status(404).send('The user with the given id was not found.');
    
//     res.send(user);
// });

// router.delete('/:id', async (req, res) => {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if(!user) return res.status(404).send('The user with the given id was not found.');
    
//     res.send(user);
// });

// router.get('/:id',  async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if(!user) return res.status(404).send('The user with the given id was not found.');
    
//     res.send(user);
// });

module.exports = router;