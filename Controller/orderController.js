const Logger = require('../logger/logger');
const logger = new Logger();
const LogType = require('../logger/logType');

const SuccessResponse = require('../response/successReponse');
const FailureResponse = require('../response/failureResponse');

const orderRepository = require('../Repository/oederRepository');

const ControllerName = 'orderController';

const orderController = {

    createOrder: (req, res) => {

        const methodName = 'createOrder';

        const { userId, addressId, totalAmount, paymentMethod, cartId } = req.body;

        if (!userId || !addressId || !totalAmount || !paymentMethod || !cartId) {

            return res.status(400).json(
                new FailureResponse(false, 'Missing required fields', '400')
            );
        }

        logger.log(ControllerName, methodName, LogType.logType.VERBOSE, 'Creating order');

        orderRepository.createOrder(
            userId,
            addressId,
            totalAmount,
            paymentMethod,
            userId,
            cartId,
            (err, result) => {

                if (err) {

                    logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed to create order', err.stack);

                    return res.status(500).json(
                        new FailureResponse(false, 'Failed to create order', '500')
                    );
                }

                logger.log(ControllerName, methodName, LogType.logType.RELEASE, 'Order created successfully');

                return res.status(200).json(
                    new SuccessResponse(true, {
                        orderId: result.orderId,
                        message: 'Order created successfully'
                    })
                );
            }
        );
    },

    getOrderHistoryByUserId: (req, res) => {
        const methodName = 'getOrderHistoryByUserId'
        const { userId } = req.query

        if (!userId) {
            return res.status(400).json(
                new FailureResponse(false, 'user id is missing', '400')
                // logger.log(ControllerName,methodName,LogType.logType.ERROR,'user id is missing','400')
            )
        }
        logger.log(ControllerName, methodName, LogType.logType.VERBOSE, 'getting order history by user id', JSON.stringify(req.query));

        orderRepository.getOrderHistoryByUserId(userId, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed to get order history by user id', err.stack);
                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get order history by user id', '500')
                );
            }
            logger.log(ControllerName, methodName, LogType.logType.RELEASE, 'Order history by user id retrieved successfully', JSON.stringify(result));
            return res.status(200).json(
                new SuccessResponse(true, {
                    orderHistory: result,
                    message: 'Order history by user id retrieved successfully'
                })
            );
        })
    },

    getAvailabeOrders: (req, res) => {
        const methodName = 'getAvailabeOrders';

        logger.log(
            ControllerName,
            methodName,
            LogType.logType.VERBOSE,
            'getting available orders',
            JSON.stringify(req.query)
        );

        // 🔒 Role check (IMPORTANT)
        if (req.user.role !== "ADMIN") {
            return res.status(403).json(
                new FailureResponse(false, 'Access denied', '403')
            );
        }

        orderRepository.getAvailabeOrders((err, result) => {
            if (err) {
                logger.log(
                    ControllerName,
                    methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to get available orders',
                    err.stack
                );

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get available orders', '500')
                );
            }

            logger.log(
                ControllerName,
                methodName,
                LogType.logType.RELEASE,
                'Available orders retrieved successfully',
                JSON.stringify(result)
            );

            return res.status(200).json(
                new SuccessResponse(true, {
                    availableOrders: result || [],  // 🔥 safety
                    message: 'Available orders retrieved successfully'
                })
            );
        });
    }

};

module.exports = orderController;