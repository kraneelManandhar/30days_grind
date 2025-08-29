const mongoose = require('mongoose');
const {Sdata,Idata} = require('./dummy')

const Schema = mongoose.Schema({
    title: Sdata,
    amount: Idata,
    category: Sdata,
    date: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = (connection) => connection.model('Expenses', Schema);