const express = require('express');
const router = express.Router();
const expensesController = require('../controller/expensesController');

router.get('/get',expensesController.findAllcost);
router.get('/get/cost/all',expensesController.sumAllCosts);

module.exports = router;