const express = require('express');
const router = express.Router();
const otpController = require('../Controller/otpController');

router.post('/sendOTP', otpController.sendOTP);

router.put('/verifyOTP', otpController.verifyOTP);

module.exports = router;
