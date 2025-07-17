const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const  schema = require('./Schema');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskTracker')
.then(()=> console.log("Connected to database"))
.catch(()=>console.log("Error connecting to database"))

app.get('/',(req,res) => {
    res.send("App is running.")
})

app.post('/post',(req,res) => {
    try{
    const data = req.body;
    const Userdata = new schema(data);
    Userdata.save();
    res.send("Task saved successfully")
    }catch(error){
        res.send("Error saving tasks")
    }
})

app.listen(port,() => {
    console.log("Go to http://localhost:5000");
});