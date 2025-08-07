const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    id : Number ,
    title: String,
    amount: Number,
    category: String,
    date: Date,
    description: String
}) 

let model = mongoose.model("tasks",Schema);

module.exports = model;