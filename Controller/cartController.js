const cartRepository = require('../Repository/cartRepository');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const FailureResponse = require('../response/failureResponse');
const SuccessResponse = require('../response/successReponse');

const logger = new Logger();
const ControllerName = 'cartController';

const cartController = {

    addToCart: (req, res) => {
        const methodName = 'addToCart';
        const { userId, productId, quantity } = req.body;
        const createdBy = userId;

        // logger.log(ControllerName, methodName, LogType.logType.VERBOSE,
        //     'Initiating get all category process', JSON.stringify(req.body));

        if (!userId || !productId || quantity == null) {
            return res.status(400).json(
                new FailureResponse(false, 'Missing required fields', '400')
            );
        }

        if (quantity <= 0) {
            return res.status(400).json(
                new FailureResponse(false, 'Quantity must be greater than 0', '400')
            );
        }
        cartRepository.addToCart(userId, productId, quantity, createdBy, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to add to cart', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to add to cart', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                'added to cart successfully', JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    cart: result,
                    message: 'added to cart successfully'
                })
            );
        });
    },

    getCartByUserId: (req, res) => {
        const methodName = 'getcartByUserId'
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json(
                new FailureResponse(false, 'user id is required', '400')
            )
        }
        cartRepository.getCartByUserId(userId, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed to get cart by user id', err.stack);
                return res.status(500).json(
                    new FailureResponse(false, 'Failed to get cart by user id', '500')
                );
            }
            logger.log(ControllerName, methodName, LogType.logType.RELEASE, 'get cart by user id successfully', JSON.stringify(result));
            return res.status(200).json(
                new SuccessResponse(true, {
                    cart: result,
                    message: 'get cart by user id successfully'
                })
            );
        })

    },

    updateCartItem: (req, res) => {
        const methodName = 'updateCartItem';
        const { cartItemId, quantity, updatedBy } = req.body;

        if (!cartItemId || quantity == null) {
            return res.status(400).json(
                new FailureResponse(false, 'cartItemId and qty are required', '400')
            );
        }

        cartRepository.updateCartItem(cartItemId, quantity, updatedBy, (err, result) => {
            if (err) {
                logger.log(ControllerName, methodName, LogType.logType.EXCEPTION, 'Failed to update cart', err.stack);
                return res.status(500).json(
                    new FailureResponse(false, 'Failed to update Cart', '500')
                );
            }

            const { affected, quantity: newQty } = result;

            if (affected === 0) {
                return res.status(404).json(
                    new FailureResponse(false, 'Cart item not found or no changes made', '404')
                );
            }

            let message = 'Cart updated successfully';
            if (newQty <= 0) {
                message = 'Item removed from cart successfully';
            }

            logger.log(ControllerName, methodName, LogType.logType.RELEASE, message, JSON.stringify(result));

            return res.status(200).json(
                new SuccessResponse(true, {
                    message: message,
                    affectedRows: affected,
                    quantity: newQty
                })
            );
        });
    },

    deleteCartItem: (req, res) => {
        const methodName = 'deleteCartItem'
        const { cartItemId } = req.query;

        if (!cartItemId) {
            return res.status(400).json(
                new FailureResponse(false, 'cartItemId is required', '400')
            )
        }

        cartRepository.deleteCartItem(cartItemId, (err) => {

            if (err) {
                logger.log(ControllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to delete cart item', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to delete cart item', '500')
                );
            }

            logger.log(ControllerName, methodName,
                LogType.logType.RELEASE,
                `cart item removed successfully`);

            return res.status(200).json(
                new SuccessResponse(true, { message: 'Item removed successfully' })
            );
        })
    },

}

module.exports = cartController;
