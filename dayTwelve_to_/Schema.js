const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name    :  {type:String , required : true }, 
    task   :   {type:String , required: true},
});

let model = mongoose.model("tasks",Schema);

module.exports = model;