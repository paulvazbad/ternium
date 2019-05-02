const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Invalid username or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid username or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        password: Joi.string().min(8).max(255).required(),
        username: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;