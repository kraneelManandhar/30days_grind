const express = require('express');
const router = express.Router();
const expensesController = require('../controller/expensesController');
const generalController = require('../controller/generalController');
router.get('/',generalController.getExpenses);
router.get('/:id',generalController.getExpenseById);
router.post('/',generalController.createExpense);
router.put('/:id',generalController.updateExpenses);
router.get('/get/cost',expensesController.findAllcost);

module.exports = router;