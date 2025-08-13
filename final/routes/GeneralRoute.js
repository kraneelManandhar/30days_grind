const express = require('express');
const router = express.Router();
const generalController = require('../controller/generalController');

router.get('/',generalController.getExpenses);
router.get('/:id',generalController.getExpenseById);
router.post('/',generalController.createExpense);
router.put('/:id',generalController.updateExpenses);
router.delete('/:id',generalController.deleteExpenses);

module.exports = router;