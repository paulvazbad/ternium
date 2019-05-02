const Joi = require('joi');
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  initialDate: {
    type: Date, 
    required: true,
    default: Date.now
  },
  endDate:{
    type: Date,
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
  },
  staff: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
      },
      registrationId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024
      }      
    }),
    required: true
  },
  data: {
    type: new mongoose.Schema({
        gasNatural: {
            type: Number,
            default: 0
        },
        co2:  {
            type: Number,
            default: 0
        },
        hidrogeno:  {
            type: Number,
            default: 0
        },
        temperatura:  {
            type: Number,
            default: 0
        },
    })
  },
  mac: String
});

const Session = mongoose.model('Session', sessionSchema);

function validateSession(session) {
  const schema = {
    staff: Joi.string().required(),
    supervisor: Joi.string().required(),
    mac: Joi.string()
  };

  return Joi.validate(session, schema);
}

//exports.sessionSchema = sessionSchema;
exports.Session = Session; 
exports.validate = validateSession;