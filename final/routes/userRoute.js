const express = require('express');
const router = express.Router();
const authcontroller = require('../controller/authcontroller');

router.post('/signup',authcontroller.register);
router.post('/login',authcontroller.login);
router.post('/verify',authcontroller.verify);

module.exports = router;