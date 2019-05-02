const mongoose = require('mongoose');

const Data = mongoose.model('Data', new mongoose.Schema({
    gasNatural: Number,
    mac: String,
    co2: Number,
    hidrogeno: Number,
    temperatura: Number
}));

exports.Data = Data;
