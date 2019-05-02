const Joi = require('joi');
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  mac: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Device = mongoose.model('Device', deviceSchema);

function validateDevice(device) {
  const schema = {
    mac: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(device, schema);
}

exports.deviceSchema = deviceSchema;
exports.Device = Device; 
exports.validate = validateDevice;