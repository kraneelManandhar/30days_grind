const mongoose = require('mongoose');
expenseDB = mongoose.createConnection(process.env.MONGODB)
const Expenses = require('../model/expensesSchema')(expenseDB);

exports.createExpense = async (req, res) => {
    try {
        const expense = new Expenses(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expenses.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find().sort({ date: -1 });
        res.json(expenses);
        console.log(req.Expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateExpenses = async (req, res) => {
    try {
        const updatedExpense = await Expenses.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return updated document
        );
        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.findAllcost = async (req, res) => {
    try { 
        const allCosts = await Expenses.find({}, 'amount -_id');
        const amountsArray = allCosts.map(item => item.amount);
        res.json({ amounts: amountsArray });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};