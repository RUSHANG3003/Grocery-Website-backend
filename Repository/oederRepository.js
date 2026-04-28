const pool = require('../config/db');
const { getOrderHistoryByUserId, updateOrderStatus } = require('../Controller/orderController');
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

        } finally {
            if (db) db.release();
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
WHERE o.order_status IN ('PLACED','CONFIRMED','OUT_FOR_DELIVERY')
            ORDER BY o.order_id_pk DESC`;
            const [result] = await db.query(sql);
            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'Available orders retrieved successfully', JSON.stringify(result));
            callback(null, result);

        }
        catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.EXCEPTION, 'Error getting available orders', err.stack);
            callback(err, null);

        }
        finally {
            if (db) db.release();
        }
    },

    updateOrderStatus: async (orderId, status, updatedBy, callback) => {
        const methodname = 'updateorderstatus'
        let db = null;

        try {
            logger.log(RepositoryName, methodname, LogType.logType.VERBOSE, 'updating order status', JSON.stringify({ orderId, status, updatedBy }))

            db = await pool.promise().getConnection();
            // await db.beginTransaction();

            const sql = `CALL usp_UpdateOrderStatus(?,?,?)`

            const [result] = await db.query(sql, [orderId, status, updatedBy])

            logger.log(RepositoryName, methodname, LogType.logType.RELEASE, 'order status updated successfully', JSON.stringify(result))

            callback(null, result);





        } catch (err) {
            logger.log(RepositoryName, methodname, LogType.logType.EXCEPTION, 'Error updating order status', err.stack);
            callback(err, null);
        }
        finally {
            if (db) db.release();
        }
    },

    getDeliveryBoys: async (callback) => {
        const methodName = 'getDeliveryBoys'
        let db = null;

        try {

            logger.log(RepositoryName, methodName, LogType.logType.VERBOSE, 'getting DeliveryBoys')

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetDeliveryBoys()`;

            const [result] = await db.query(sql);

            const deliveryBoys = result[0];

            logger.log(RepositoryName, methodName, LogType.logType.RELEASE, 'details of delivery boys retreived successfully', JSON.stringify(deliveryBoys));
            callback(null, deliveryBoys);

        } catch (err) {
            logger.log(RepositoryName, methodName, LogType.logType.ERROR, 'error getting delivery boys', err.stack)
            callback(err, null)
        } finally {
            if (db) db.release();
        }

    },

    assignDeliveryBoy: async (orderId, deliveryBoyId, updatedBy, callback) => {
        const methodName = 'assignDeliveryBoy';
        let db = null;

        try {
            logger.log(
                RepositoryName,
                methodName,
                LogType.logType.VERBOSE,
                'Assigning delivery boy',
                JSON.stringify({ orderId, deliveryBoyId, updatedBy })
            );

            db = await pool.promise().getConnection();

            const sql = `CALL usp_AssignDeliveryBoy(?, ?, ?)`;

            const [result] = await db.query(sql, [orderId, deliveryBoyId, updatedBy]);

            logger.log(
                RepositoryName,
                methodName,
                LogType.logType.RELEASE,
                'Delivery boy assigned successfully',
                JSON.stringify(result)
            );

            callback(null, result);

        } catch (err) {
            logger.log(
                RepositoryName,
                methodName,
                LogType.logType.EXCEPTION,
                'Error assigning delivery boy',
                err.stack
            );

            callback(err, null);
        } finally {
            if (db) db.release();
        }
    },

    getAssignedOrders: async (deliveryBoyId, callback) => {
        const methodName = 'getAssignedOrders';
        let db = null;

        try {
            logger.log(
                RepositoryName,
                methodName,
                LogType.logType.VERBOSE,
                'Getting assigned orders',
                JSON.stringify(deliveryBoyId)
            );

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetAssignedOrders(?)`;

            const [result] = await db.query(sql, [deliveryBoyId]);

            const deliveryDetails = result[0];

            logger.log(
                RepositoryName,
                methodName,
                LogType.logType.RELEASE,
                'Assigned orders retrieved successfully',
                JSON.stringify(deliveryDetails)
            );

            callback(null, deliveryDetails);

        } catch (err) {
            logger.log(
                RepositoryName,
                methodName,
                LogType.logType.EXCEPTION,
                'Error getting assigned orders',
                err.stack
            );

            callback(err, null);
        } finally {
            if (db) db.release();
        }
    }


};

module.exports = orderRepository;