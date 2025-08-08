const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name : {type : String,required : true},
    password : {type : String ,required : true}
});

module.exports = (connection) => connection.model('User', Schema);