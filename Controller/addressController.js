const addressRepository = require('../Repository/addressRepository');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const FailureResponse = require('../response/failureResponse');
const SuccessResponse = require('../response/successReponse');

const logger = new Logger();
const ControllerName = 'addressController';

const addressController = {

    addAddress: (req, res) => {
        const methodName = 'addAddress';
        const { userId, addressType, fullAddress, landmark, city, state, pincode, createdBy } = req.body;

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating add address process', JSON.stringify(req.body));

        if (!userId) {
            return res.status(400).json(
                new FailureResponse(false, 'User ID is required', '400')
            );
        }

        addressRepository.addAddress(userId, addressType, fullAddress, landmark, city, state, pincode, createdBy, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to add address', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to add address', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'Address added successfully', JSON.stringify({ userId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    userId,
                    message: 'Address added successfully'
                })
            );
        });
    },

    getAllAddressByUserId: (req, res) => {
        const methodName = 'getAllAddressByUserId';
        const { userId } = req.query;

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating get all address by user ID process', JSON.stringify(req.body));

        if (!userId) {
            return res.status(400).json(
                new FailureResponse(false, 'User ID is required', '400')
            );
        }

        addressRepository.getAllAddressByUserId(userId, (err, addresses) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get all address by user ID', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get all address by user ID', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'All address by user ID retrieved successfully', JSON.stringify({ userId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    addresses,
                    message: 'All address by user ID retrieved successfully'
                })
            );
        });
    },

    getAddressById: (req, res) => {
        const methodName = 'getAddressById';
        const { addressId } = req.query;

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating get address by ID process', JSON.stringify(req.body));

        if (!addressId) {
            return res.status(400).json(
                new FailureResponse(false, 'Address ID is required', '400')
            );
        }

        addressRepository.getAddressById(addressId, (err, address) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get address by ID', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get address by ID', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'Address by ID retrieved successfully', JSON.stringify({ addressId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    address,
                    message: 'Address by ID retrieved successfully'
                })
            );
        });
    },

    updateAddress: (req, res) => {
        const methodName = 'updateAddress';
        const { addressId, userId, addressType, fullAddress, landmark, city, state, pincode, updatedBy } = req.body;

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating update address process', JSON.stringify(req.body));

        if (!addressId) {
            return res.status(400).json(
                new FailureResponse(false, 'Address ID is required', '400')
            );
        }

        addressRepository.updateAddress(addressId, userId, addressType, fullAddress, landmark, city, state, pincode, updatedBy, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to update address', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to update address', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'Address updated successfully', JSON.stringify({ addressId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    addressId,
                    message: 'Address updated successfully'
                })
            );
        });
    },

    deleteAddressById: (req, res) => {
        const methodName = 'deleteAddressById';
        const { addressId } = req.query;

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
            'Initiating delete address by ID process', JSON.stringify(req.body));

        if (!addressId) {
            return res.status(400).json(
                new FailureResponse(false, 'Address ID is required', '400')
            );
        }

        addressRepository.deleteAddressById(addressId, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to delete address by ID', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to delete address by ID', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'Address by ID deleted successfully', JSON.stringify({ addressId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    addressId,
                    message: 'Address by ID deleted successfully'
                })
            );
        });
    },
}

module.exports = addressController;
