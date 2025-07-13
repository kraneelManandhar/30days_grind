const express = require('express');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');
const port = 5000;

app.use(express.json());

const Schema = mongoose.Schema(
    {
        name:String,
        age: Number
    }
)

const User = mongoose.model("learnDB",Schema)

mongoose.connect('mongodb://localhost:27017/dayEight')
.then(()=>console.log("Connected."))
.catch((err) => console.log("Error connecting to database."))


app.get('/',async (req,res) => {
    try{
        const users = await User.find()
        res.send(users)
    }catch(error){
        res.send("Error occured while displaying data");
    }
});

app.post('/newUser',async(req,res) => {
    try{
        const newUser = req.body;
        const Upload = new User(newUser);
        await Upload.save();
        res.send(`${newUser.name} added to database`)
    }catch(error){
        res.send("Error while saving the user.")
    }
})

app.delete('/:name',async (req,res) => {
    try{
        const enteredName = req.params.name;
        const Delete = await User.deleteOne({"name" : enteredName});
        res.send(`${enteredName} has been deleted from database.`)
    }catch(error){
        res.send("Failed to delete the user")
    }
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mydarling3547@gmail.com',
        pass: 'yfra torv ctqw khlw'
    }
});

const mailOptions = {
    from: 'mydarling3547@gmail.com',
    to: 'hansyktomah@gmail.com',
    subject: 'Test Email from NodeMailer',
    text: 'Hello, this is a test email from NodeMailer in Node.js!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred: ', error);
    } else {
        console.log('Email sent: ', info.response);
    }
});


app.listen(port,() => {
    console.log("http://localhost:5000");
})