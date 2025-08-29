const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const generalRoute = require('./routes/GeneralRoute');
const expensesRoute = require('./routes/expensesRoute');
const userRoute = require('./routes/userRoute');

app.use(express.json());

const expenseDB = mongoose.createConnection(process.env.MONGODB);
const ColUser = mongoose.createConnection(process.env.userDB);

const Expenses = require('./model/expensesSchema')(expenseDB);
const User = require('./model/UserInfo')(ColUser)

app.use("/api/gen", (req, res, next) => {
    req.Expenses = Expenses;
    next();
}, generalRoute);

app.use("/api/exp", (req, res, next) => {
    req.Expenses = Expenses;
    next();
}, expensesRoute);

app.use("/api/auth", (req, res, next) => {
    req.Expenses = Expenses;
    next();
}, userRoute);

app.use((req,res)=>{
  res.status(401).json({message:'invaid route'})
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});