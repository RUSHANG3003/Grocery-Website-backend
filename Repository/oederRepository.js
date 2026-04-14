const pool = require('../config/db');
const { getOrderHistoryByUserId } = require('../Controller/orderController');
const Logger = require('../logger/logger');
const logger = new Logger();
const LogType = require('../logger/logType');

const RepositoryName = 'orderRepository';

const orderRepository = {

    createOrder: async (userId, addressId, totalAmount, paymentMethod, createdBy, cartId, callback) => {
        const methodName = 'createOrder';
        let db = null;

        try {

            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'Creating order');

            db = await pool.promise().getConnection();
            await db.beginTransaction();

            // Create Order
            const sqlOrder = `CALL usp_CreateOrder(?, ?, ?, ?, ?, @outpar)`;

            await db.query(sqlOrder, [
                userId,
                addressId,
                totalAmount,
                paymentMethod,
                createdBy
            ]);

            // Get order id
            const [orderIdResult] = await db.query(`SELECT @outpar AS orderId`);
            const orderId = orderIdResult[0].orderId;

            // Add Order Items
            const sqlItems = `CALL usp_AddOrderItemsFromCart(?, ?, ?)`;

            await db.query(sqlItems, [
                orderId,
                cartId,
                createdBy
            ]);

            // Clear Cart
            const clearCartSql = `DELETE FROM cart_item_tbl WHERE cart_id_fk = ?`;

            await db.query(clearCartSql, [cartId]);

            await db.commit();

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Order created successfully');

            callback(null, { orderId });

        } catch (err) {

            if (db) await db.rollback();

            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error creating order', err.stack);

            callback(err, null);

        } finally {

            if (db) db.release();
        }
    },

    getOrderHistoryByUserId: async (userId, callback) => {
        const merhodName = 'getOrderHistoryByUserId'
        let db = null;
        try {
            logger.log(RepositoryName, merhodName, LogType.logType.VERBOSE, 'getting OrderHistory By UserId', JSON.stringify(userId));

            db = await pool.promise().getConnection();
            const sql = `CALL usp_GetOrderHistoryByUserId(?)`;
            const [result] = await db.query(sql, [userId]);
            logger.log(RepositoryName, merhodName, LogType.logType.RELEASE, 'order history retreived sucessfully', JSON.stringify(result));
            callback(null, result);

        }
        catch (err) {
            logger.log(RepositoryName, merhodName, LogType.logType.EXCEPTION, 'Error getting order history by user id', err.stack);
            callback(err, null);

        }
    },

    getAvailabeOrders: async (callback) => {
        const methodName = 'getAvailabeOrders'
        let db = null;
        try {
            // logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'getting available orders', JSON.stringify(req.query));

            db = await pool.promise().getConnection();
            const sql = ` SELECT 
                o.*,
                a.address_type AS addressType,
                a.full_address AS fullAddress,
                a.city AS city,
                a.state AS state,
                a.pincode AS pincode,
                u.user_name AS deliveryBoyName
            FROM order_tbl o
             LEFT JOIN address_tbl a 
                ON o.address_id_fk = a.address_id_pk
            LEFT JOIN user_tbl u 
                ON o.delivery_boy_id = u.user_id_pk

            WHERE o.order_status IN ('PLACED','CONFIRMED')
            AND o.delivery_boy_id IS NULL
            ORDER BY o.order_id_pk DESC`;
            const [result] = await db.query(sql);
            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Available orders retrieved successfully', JSON.stringify(result));
            callback(null, result);

        }
        catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error getting available orders', err.stack);
            callback(err, null);

        }
    }

};

module.exports = orderRepository;