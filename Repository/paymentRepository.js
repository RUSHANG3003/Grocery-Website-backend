const { db, closeConnection } = require('../config/db');

const Logger = require('../logger/logger');
const logger = new Logger();
const LogType = require('../logger/logType')

const pool = require('../config/db');
const Razorpay = require("razorpay");

const RepositoryName = 'paymentRepository';
const razorpay = new Razorpay({
    key_id: "rzp_test_SPqQ4f2Y0bWgYn",
    key_secret: "ACv3ERDPtQgufUQzpvmg7k2V",
});


const paymentRepository = {

    formatDateForMySQL: (isoDate) => {
        if (!isoDate || isNaN(new Date(isoDate).getTime())) {
            return null; // Return NULL if date is invalid
        }
        const date = new Date(isoDate); // Parse ISO string
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Return only YYYY-MM-DD
    },




    createRazorpayOrder: async (amount, currency = "INR") => {
        try {
            const options = {
                amount: amount, // Amount in paise
                currency: currency,
                // receipt removed
            };

            const order = await razorpay.orders.create(options);
            return order;
        } catch (error) {
            console.error("Error creating Razorpay order:", error);
            throw new Error("Failed to create Razorpay order");
        }
    },


    generateRazorpayOrder: async (userId, orderId, amount, callback) => {
        const methodName = "generateRazorpayOrder";
        logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, "Starting to create a new Razorpay order.");
        let db = null;

        try {
            // // Calculate total amount (in paise) – gstAmount can be 0 if not provided
            // const totalAmount = ((subscriptionData.amount + (subscriptionData.gstAmount || 0)) * 100);
            const totalAmount = amount * 100;

            // Create a Razorpay order (no receiptId)
            const razorpayOrder = await paymentRepository.createRazorpayOrder(totalAmount, "INR");

            // Stored procedure call
            const sql = `CALL usp_AddPaymentTransaction(?, ?, ?, ?, @outpar);`;
            const getOutParamSQL = `SELECT @outpar AS outputParam;`;

            const queryParams = [
                orderId,
                razorpayOrder.id,
                amount,
                userId
            ];

            db = await pool.promise().getConnection();
            await db.beginTransaction();

            // Execute the stored procedure
            await db.query(sql, queryParams);

            // Fetch the output parameter (transaction ID)
            const [outParamResult] = await db.query(getOutParamSQL);
            const transactionId = outParamResult[0].outputParam;

            await db.commit();

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, "Transaction recorded successfully.", JSON.stringify(outParamResult));
            callback(null, { transactionId: transactionId, razorpayOrderId: razorpayOrder.id, amount: totalAmount });

        } catch (err) {
            if (db) await db.rollback();
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, "Error during transaction", err.stack);
            callback(err);
        } finally {
            if (db) {
                db.release();
                db = null;
            }
        }
    },





    updatePaymentStatus: async (paymentData, event, callback) => {
        const methodName = "updatePaymentStatus";
        logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, "Starting to create a new Razorpay order.");
        var db = null;

        try {
            // Extract required fields from paymentData
            const razorpayPaymentId = paymentData.id;
            const razorpayOrderId = paymentData.order_id;
            const paymentStatus = event === "payment.captured" ? 1 : 2;  // Can be "captured", "failed", etc.
            const updatedAt = new Date();

            // Define stored procedure call
            const sql = `CALL usp_UpdatePaymentStatus(?, ?, ?, ?, @outpar);`;
            const getOutParamSQL = `SELECT @outpar AS outputParam;`;

            // Prepare query parameters
            const queryParams = [
                razorpayPaymentId,
                razorpayOrderId,
                paymentStatus,
                updatedAt,
            ];

            // Connect to database
            db = await pool.promise().getConnection();
            await db.beginTransaction();

            // Execute the stored procedure
            await db.query(sql, queryParams);

            // Fetch the output parameter (transaction ID)
            const [outParamResult] = await db.query(getOutParamSQL);
            const transactionId = outParamResult[0].outputParam;

            await db.commit();

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, "Payment status updated successfully.", JSON.stringify(outParamResult));
            callback(null, { transactionId });

        } catch (err) {
            if (db) await db.rollback();
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, "Error updating payment status", err.stack);
            callback(err);
        } finally {
            if (db != null) {
                db.release();
                db = null;
            }
        }
    },








};

module.exports = paymentRepository;
