const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/addToCart', authenticateToken, cartController.addToCart);

router.get('/getCartByUserId', authenticateToken, cartController.getCartByUserId)

router.put('/updateCartItem', authenticateToken, cartController.updateCartItem)

router.delete('/deleteCartItem', authenticateToken, cartController.deleteCartItem)

module.exports = router;
