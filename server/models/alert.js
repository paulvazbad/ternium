const Joi = require('joi');
const mongoose = require('mongoose');
const sessionSchema = require('./session');

const alertSchema = new mongoose.Schema({
  date: {
    type: Date, 
    required: true,
    default: Date.now
  },
  session: {
      type: sessionSchema,
      required: true
  }
});

const Alert = mongoose.model('Alert', alertSchema);

// function validateAlert(alert) {
//   const schema = {
//     mac: Joi.string().min(5).max(50).required()
//   };

//   return Joi.validate(alert, schema);
// }

exports.alertSchema = alertSchema;
exports.Alert = Alert; 
// exports.validate = validateAlert;