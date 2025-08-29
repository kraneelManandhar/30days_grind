const mongoose = require('mongoose');
const {Sdata} = require('./dummy')

const Schema = mongoose.Schema({
    name : Sdata,
    email : Sdata,
    password : Sdata
});

module.exports = (connection) => connection.model('User', Schema);