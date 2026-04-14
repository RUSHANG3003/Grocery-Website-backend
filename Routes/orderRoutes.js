const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();
const orderController = require('../Controller/orderController');

router.post('/create-order', authenticateToken, orderController.createOrder);

router.get('/GetOrderHistoryByUserId', authenticateToken, orderController.getOrderHistoryByUserId);

router.get('/getAvailabeOrders', authenticateToken, orderController.getAvailabeOrders);

// router.post('/AddItemFromCart',authenticateToken, orderController.AddItemFromCart);
module.exports = router;