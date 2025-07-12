const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const Schema = mongoose.Schema(
    {
        name: {type:String,required:[false,"Please enter your name"]},
        id:{type:Number,required:true},
        age:{type:Number,required:true}
    },{timestamp:true}
);

const User = mongoose.model("learnDB", Schema);

mongoose.connect('mongodb://localhost:27017/daySeven')
.then(() => {
    console.log("Connected to database")
})
.catch((err) => {
    console.log("Error connecting to database.")
})

app.post('/',async (req,res) => {
    try{
        const userData = req.body;
        const newUser = new User(userData);
        await newUser.save();
        res.send("User added to database.")
    }catch(error){
        res.send("Error while saving the data.")
    }
});

app.get('/',async(req,res) => {
try{
    const userData =await User.find();
    res.send(userData);
}catch(error){
res.send("Error fetching data")
}
});

app.delete('/:id',async (req,res) => {
    try{
        const userToDelete = req.params.id;
        const UserDel = await User.deleteOne(userToDelete);
    }catch{
        res.send("Couldn't Delete the user.")
    }
});

app.listen(5000,() =>{
    console.log("Server hosted at http://localhost:5000");
});