const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const addressController = require('../Controller/addressController');


router.post('/addAddress', authenticateToken, addressController.addAddress);

router.put('/updateAddress', authenticateToken, addressController.updateAddress);

router.get('/getAllAddressByUserId', authenticateToken, addressController.getAllAddressByUserId);

router.get('/getAddressById', authenticateToken, addressController.getAddressById);

router.delete('/deleteAddressById', authenticateToken, addressController.deleteAddressById);

module.exports = router;

