const express = require('express');
const userController = require('../Controller/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/updateUser', authenticateToken, userController.updateUser);

router.get('/getUserById', authenticateToken, userController.getUserById);

module.exports = router;
