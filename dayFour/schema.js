const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name :{type:String, required : true},
    age : {type:Number, required : true}
})
let model= mongoose.model("seller",userSchema);

module.exports = model;