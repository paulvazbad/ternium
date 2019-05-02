const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
  },
  password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024
  },
  username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255
  },
  area: {
      type: String,
      required: true,
      maxlength: 255
  },
  rol: {
      type: String,
      required: true,
      maxlength: 255
  },
  team: {
      type: Array
  },
  isAdmin: Boolean
});


userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    username: Joi.string().min(8).max(255).required(),
    area: Joi.string().max(255).required(),
    rol: Joi.string().max(255).required(),
    team: Joi.array()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;