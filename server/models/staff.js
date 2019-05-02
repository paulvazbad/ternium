const Joi = require('joi');
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  area:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  registrationId:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    unique: true
  },
  supervisor: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
      },
      username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
      }      
    }),  
    required: true
  }
});

const Staff = mongoose.model('Staff', staffSchema);

function validateStaff(staff) {
  const schema = {
    name: Joi.string().min(2).max(1024).required(),
    area: Joi.string().min(2).max(1024).required(),
    registrationId: Joi.string().min(2).max(1024).required(),
    supervisor: Joi.string().required(),
  };

  return Joi.validate(staff, schema);
}

//exports.staffSchema = staffSchema;
exports.Staff = Staff; 
exports.validate = validateStaff;