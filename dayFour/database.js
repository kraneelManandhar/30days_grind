const express = require('express');
const app = express();
const schema = require('./schema');
const port = 5000;
const mongoose = require('mongoose');
app.use(express.json())
const dbURI = "mongodb+srv://user:admin@learndb.tvhviwa.mongodb.net/learnDatabase"
mongoose.connect(dbURI).then(()=>{
    console.log("connect");
});

app.post('/',async(req,res) =>{
    const b = req.body
   const  newuser = new schema(b)
     newuser.save()
    res.send("sucessfully")
})

app.listen(5000, () => {
    console.log("Server is running.");
});