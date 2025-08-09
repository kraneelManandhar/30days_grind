const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const expensesRoute = require('./routes/route');

app.use(express.json());

const expenseDB = mongoose.createConnection(process.env.MONGODB);

const Expenses = require('./model/expensesSchema')(expenseDB);

app.use("/api/expenses", (req, res, next) => {
    req.Expenses = Expenses;
    next();
}, expensesRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});