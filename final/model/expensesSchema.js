const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = (connection) => connection.model('Expenses', Schema);