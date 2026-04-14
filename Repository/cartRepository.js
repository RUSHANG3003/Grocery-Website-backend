const pool = require('../config/db');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const logger = new Logger();
const RepositoryName = 'cartRepository';

const cartRepository = {

    addToCart: async (userId, productId, quantity, createdBy, callback) => {
        const methodName = 'addToCart';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Adding to cart`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_AddToCart(?, ?, ?, ?)`;

            const [result] = await db.query(sql, [userId, productId, quantity, createdBy]);

            const cart = result[0] || [];

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Added to cart successfully`);

            callback(null, cart);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error adding to cart', err.stack);

            callback(err, null);

        } finally {
            if (db) db.release();
        }
    },

    getCartByUserId: async (userId, callback) => {
        const methodname = 'getCartByUserId'
        let db = null;

        try {
            logger.log(RepositoryName, methodname,
                LogType.logType.VERBOSE,
                `Getting cart by user id`
            )

            db = await pool.promise().getConnection()
            const sql = `CALL usp_GetCartByUserId(?)`

            const [result] = await db.query(sql, [userId])

            const cart = result[0] || []

            logger.log(RepositoryName, methodname,
                LogType.logType.RELEASE, 'get cart by user id successfully'
            )
            callback(null, cart)
        } catch (err) {
            logger.log(RepositoryName, methodname,
                LogType.logType.EXCEPTION, 'Error getting cart by user id', err.stack
            )
            callback(err, null)
        } finally {
            if (db) db.release()
        }

    },

    updateCartItem: async (cartItemId, quantity, updatedBy, callback) => {
        const methodName = 'updateCartItem'
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Updating cart quantity: cartItemId=${cartItemId}, quantity=${quantity}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_UpdateCartQty(?, ?, ?)`;

            const [result] = await db.query(sql, [cartItemId, quantity, updatedBy]);

            // For CALL statements with no SELECT, result is an array containing the ResultSetHeader
            const affected = result.affectedRows !== undefined ? result.affectedRows : (result[0] ? result[0].affectedRows : 0);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Updated cart successfully. Affected rows: ${affected}`);

            callback(null, { affected, quantity });

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error updating cart', err.stack);

            callback(err, null);

        } finally {
            if (db) db.release();
        }
    },

    deleteCartItem: async (cartItemId, callback) => {
        const methodName = 'deleteCartItem'
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `deleting cart item cartItemId=${cartItemId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_RemoveCartItem(?)`;

            await db.query(sql, [cartItemId]);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `cart item deleted successfully`);

            callback(null, true);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error deleting cart item', err.stack);

            callback(err, null);

        } finally {
            if (db) db.release();
        }
    },


}

module.exports = cartRepository;
