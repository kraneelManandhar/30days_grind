const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = 5000;
const schema = require("./model/Schema");
require("dotenv").config();

app.use(express.json());

// console.log(process.env.MONGODB);

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error connecting to database"));

// app.post("/login", async (req, res) => {
//   const { name } = req.body;
//   const { id } = req.query;

//   if (!name) {
//     return res.status(400).json({ message: "Name is required" });
//   }

//   try {
//     const user = await schema.findOne({ name: name });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const token = jwt.sign({ name: name }, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ accesstoken: token });
//     console.log(token);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

// app.get("/posts", authenticate, async (req, res) => {
//   try {
//     const posts = await schema.find({ name: req.user.name });
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// function authenticate(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res.send("Unauthorized");
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.send("Invalid Token.");
//     }

//     req.user = user;
//     next();
//   });
// }

app.listen(port, () => {
  console.log("Go to http://localhost:5000");
});
