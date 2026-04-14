const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/getAllCategory', authenticateToken, categoryController.getAllCategory);

router.post('/addCategory', authenticateToken, categoryController.addCategory);

router.put('/updateCategory', authenticateToken, categoryController.updateCategory);

router.get('/getCategoryById', authenticateToken, categoryController.getCategoryById);

router.delete('/deleteCategory', authenticateToken, categoryController.deleteCategory);

module.exports = router;
