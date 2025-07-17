const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskTracker')
.then(()=> console.log("Connected to database"))
.catch(()=>console.log("Error connecting to database"))

const User = mongoose.model("taskTracker, Schema");

app.get('/',(req,res) => {
    res.send("App is running.")
})

app.post('/post',(req,res) => {
    const data = req.body;
    const Userdata = mongoose.Schema
})

app.post('/notes',(req,res)=> {

})
app.listen(port,() => {
    console.log("Go to http://localhost:5000");
});