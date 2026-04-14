const express = require("express");
const router = express.Router();
const paymentController = require("../Controller/paymentController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/generate-razorpay-order", authenticateToken, paymentController.generateRazorpayOrder);
router.post("/webhook", authenticateToken, paymentController.razorpayWebhook);

module.exports = router;