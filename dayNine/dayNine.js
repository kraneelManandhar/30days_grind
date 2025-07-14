const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const Schema = mongoose.Schema(
    {
        name : String,
        age : Number
    }
)
const User = mongoose.model("learnDB",Schema);

mongoose.connect('mongodb://localhost:27017/dayNine')
.then(()=> console.log("Connected"))
.catch((error)=> console.log("Error"))

app.post('/',async (req,res)=> {
    const users = req.body;
    const addUser = new User(users);
    await addUser.save();
    res.send(addUser)
})

app.use('/',(req,res) => {
    res.send("Go to post for adding information.")
})

app.listen(5000,()=>{
    console.log("Hosted in http://localhost:5000");
})