const FailureResponse = require('../response/failureResponse');
const SuccessResponse = require('../response/successReponse');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const userRepository = require('../Repository/userRepository');

const logger = new Logger();
const controllerName = 'userController';

const userController = {

    updateUser: (req, res) => {
        const methodName = 'updateUser';
        const { userId, userName, mobileNumber, updatedBy } = req.body;

        logger.log(controllerName, methodName, LogType.logType.VERBOSE,
            'Initiating user update process', JSON.stringify(req.body));

        if (!userId || !userName || !mobileNumber || !updatedBy) {
            return res.status(400).json(
                new FailureResponse(false, 'All fields are required', '400')
            );
        }

        userRepository.updateUser(userId, userName, mobileNumber, updatedBy, (err, oId) => {
            if (err) {
                logger.log(controllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to update user', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to update user', '500')
                );
            }

            logger.log(controllerName, methodName, LogType.logType.RELEASE,
                'User updated successfully', JSON.stringify({ userId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    userId,
                    oId,
                    message: 'User updated successfully'
                })
            );
        });
    },

    getUserById: (req, res) => {
        const methodName = 'getUserById';
        const { userId } = req.query;

        logger.log(controllerName, methodName, LogType.logType.VERBOSE,
            'Initiating user get process', JSON.stringify(req.query));

        if (!userId) {
            return res.status(400).json(
                new FailureResponse(false, 'User ID is required', '400')
            );
        }

        userRepository.getUserById(userId, (err, user) => {
            if (err) {
                logger.log(controllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get user', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get user', '500')
                );
            }

            logger.log(controllerName, methodName, LogType.logType.RELEASE,
                'User retrieved successfully', JSON.stringify({ userId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    user,
                    message: 'User retrieved successfully'
                })
            );
        });
    }

};

module.exports = userController;