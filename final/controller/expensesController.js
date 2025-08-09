const mongoose = require('mongoose');
expenseDB = mongoose.createConnection(process.env.MONGODB)
const Expenses = require('../model/expensesSchema');

exports.findAllcost = async (req, res) => {
    try { 
        const allCosts = await Expenses.find({}, 'amount -_id');
        const amountsArray = allCosts.map(item => item.amount);
        res.json({ amounts: amountsArray });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};