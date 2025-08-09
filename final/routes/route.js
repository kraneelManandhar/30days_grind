const express = require('express');
const router = express.Router();
const expensesController = require('../controller/expensesController');

router.get('/',expensesController.getExpenses);
router.get('/:id',expensesController.getExpenseById);
router.post('/',expensesController.createExpense);
router.put('/:id',expensesController.updateExpenses);
router.get('/get/cost',expensesController.findAllcost);

module.exports = router;