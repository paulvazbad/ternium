const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}));

function validateUser(user){
    const schema = {
        username: Joi.string().alphanum().required(),
        //password: Joi.string().Joi.string().regex(/^[a-zA-Z0-9]/).required()
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;