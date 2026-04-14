const express = require('express');
const router = express.Router();
const productsController = require('../Controller/productsController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/getProductsByCategoryId', authenticateToken, productsController.getProductsByCategoryId);

router.post('/AddProduct', authenticateToken, upload.single('image'), productsController.AddProduct);

router.get('/getAllProduct', authenticateToken, productsController.getAllProduct);

router.get('/getProductById', authenticateToken, productsController.getProductById);

// router.put('/updateProduct', authenticateToken, productsController.updateProduct);

// router.get('/getAllProduct', authenticateToken, productsController.getAllProduct);

// router.get('/getProductById', authenticateToken, productsController.getProductById);

// router.delete('/deleteProduct', authenticateToken, productsController.deleteProduct);

module.exports = router;
