const express = require('express');
const app = express();
const port = 5000;
require("dotenv").config()
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name : String,
    user_id : Number,
    user_age : Number
})


const User = mongoose.model("collection",userSchema);
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/dbname')
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected"))
.catch((err)=> console.log("error"))


app.post('/',async (req,res) => {
    try{
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.send("User added to database.");
    }catch(error){
        res.send("We encountered an error.")
    }
})

app.listen(port,()=>{
    console.log(`The server is hosted in http://localhost:${port}.`);
})