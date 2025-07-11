const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name : String,
    user_id : Number,
    user_age : Number
})


const User = mongoose.model("collection",userSchema);
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/daySix')
.then(() => console.log("Connected"))
.catch((err)=> console.log("error"))


app.post('/add',async (req,res) => {
    try{
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.send("User added to database.");
    }catch(error){
        res.send("We encountered an error.")
    }
})

app.get('/users',async (req,res) => {
    try{
        const user = await User.find();
        res.json(user);
    }catch(error){
        res.send(error);
    }
});

app.get('/',async (req,res) => {
    try{
        const users = await User.find({user_name: "Hari"});
        res.send(users);
    }catch (error) {
        res.send(Error);
    }
})

app.delete('/user/:name',async (req,res) => {
    try{
        const nameToDelete = req.params.name;
        // const users = await User.find({user_name : nameToDelete});
        const users = await User.deleteOne({ user_name: nameToDelete });


        if (users.length === 0){
            res.send("User not found.");
        }
        res.send(users);
    }catch (error){
        res.send(error)
    }
})

app.get('/user/:user_id',async (req,res) => {
    try{
        const idToDelete = req.params.user_id;
        const users = await User.find({user_id : idToDelete});
        res.send(users);
    }catch (error){
        res.send(error)
    }
})

app.listen(port,()=>{
    console.log(`The server is hosted in http://localhost:${port}.`);
})