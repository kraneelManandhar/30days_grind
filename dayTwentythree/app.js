const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;

const schema = mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

app.use(express.json());

const User = mongoose.model("learnDB", schema);

mongoose.connect("mongodb://localhost:27017/dayTwentythree");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/data',async (req,res)=> {
  try{
    const data = await User.find();
    if (data.length === 0) {
      return res.send("No data in database.")
    }
    res.send(data);
  }catch(error){
    res.json({message : error})
  }
})

app.listen(port, (req, res) => {
  console.log("Hosted to http://localhost:5000");
});
