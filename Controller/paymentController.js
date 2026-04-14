const Logger = require('../logger/logger');
const logger = new Logger();
const LogType = require('../logger/logType');
const SuccessResponse = require('../response/successReponse');
const FailureResponse = require('../response/failureResponse');
const paymentRepository = require('../Repository/paymentRepository');

const controllerName = 'paymentController';

const paymentController = {


    generateRazorpayOrder: (req, res) => {
        const methodName = 'generateRazorpayOrder';
        const { userId, orderId, amount } = req.body;
        // const currentuserId = req.headers['currentuserid'];

        if (!userId || !orderId || !amount) {
            logger.log(controllerName, methodName, LogType.logType.ERROR, 'Missing required fields', JSON.stringify(req.body));
            const failureResponse = new FailureResponse(false, 'Missing required fields', '400');
            return res.status(400).json(failureResponse);
        }

        logger.log(controllerName, methodName, LogType.logType.VERBOSE, 'Attempting to create a razorpay order', JSON.stringify(amount));

        paymentRepository.generateRazorpayOrder(userId, orderId, amount, (err, result) => {
            if (err) {
                logger.log(controllerName, methodName, LogType.logType.EXCEPTION, 'Failed to create razorpay order', err.stack);
                const failureResponse = new FailureResponse(false, 'Failed to create razorpay order', '500');
                return res.status(500).json(failureResponse);
            }

            logger.log(controllerName, methodName, LogType.logType.RELEASE, 'Razorpay order created successfully', JSON.stringify(result));
            const successResponse = new SuccessResponse(true, {
                transactionId: result.transactionId,
                razorpayOrderId: result.razorpayOrderId,
                amount: result.amount,
                message: 'Razorpay order created successfully'
            });
            return res.status(201).json(successResponse);
        });
    },


    razorpayWebhook: async (req, res) => {
        const methodName = 'razorpayWebhook';
        logger.log(controllerName, methodName, LogType.logType.DEBUG, 'Webhook reqest body:', JSON.stringify(req.body, null, 2));

        const event = req.body.event;
        const paymentData = req.body.payload.payment.entity;
        logger.log(controllerName, methodName, LogType.logType.DEBUG, 'Webhook event:', event);

        try {
            // Send entire paymentData to repository
            await paymentRepository.updatePaymentStatus(paymentData, event, (err, result) => {
                if (err) {
                    console.error("Error updating payment status:", err);
                    logger.log(controllerName, methodName, LogType.logType.EXCEPTION, 'Failed to update payment', err);
                    return res.status(500).json({ success: false, message: "Failed to update payment" });
                }
                console.log("Payment status updated successfully:", result);
                res.status(200).json({ success: true, message: "Webhook processed successfully" });
            });

        } catch (error) {
            console.error("Error processing webhook:", error);
            logger.log(controllerName, methodName, LogType.logType.EXCEPTION, 'Error processing webhook:', error);
            res.status(500).json({ success: false, message: "Server error" });
        }

    },

};

module.exports = paymentController;
