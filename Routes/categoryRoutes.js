const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { uploadCategory } = require('../middleware/upload');



router.get('/getAllCategory', authenticateToken, categoryController.getAllCategory);

router.post('/addCategory', authenticateToken, uploadCategory.single('categoryImage'), categoryController.addCategory);

router.put('/updateCategory', authenticateToken, uploadCategory.single('categoryImage'), categoryController.updateCategory);

router.get('/getCategoryById', authenticateToken, categoryController.getCategoryById);

router.delete('/deleteCategory', authenticateToken, categoryController.deleteCategory);

module.exports = router;
