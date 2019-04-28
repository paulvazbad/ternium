const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true
  },
  gasses: {
    type: Object
  }
});

const ActiveSession = mongoose.model("ActiveSessions", sessionSchema);

exports.ActiveSession = ActiveSession;
