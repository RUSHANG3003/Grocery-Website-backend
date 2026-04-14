const pool = require('../config/db');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const logger = new Logger();
const RepositoryName = 'addressRepository';

const addressRepository = {

    addAddress: async (userId, addressType, fullAddress, landmark, city, state, pincode, createdBy, callback) => {
        const methodName = 'addAddress';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Adding address for user ${userId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_AddAddress(?, ?, ?, ?, ?, ?, ?, ?)`;

            await db.query(sql, [userId, addressType, fullAddress, landmark, city, state, pincode, createdBy]);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Address added successfully for user: ${userId}`);

            callback(null, userId);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error adding address', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    getAllAddressByUserId: async (userId, callback) => {
        const methodName = 'getAllAddressByUserId';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting all addresses for user ${userId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetAllAddressByUserId(?)`;

            const [result] = await db.query(sql, [userId]);

            const addresses = result[0];

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Addresses retrieved successfully for user ${userId}`);

            callback(null, addresses);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting addresses', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    getAddressById: async (addressId, callback) => {
        const methodName = 'getAddressById';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting address by ID ${addressId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetAddressById(?)`;

            const [result] = await db.query(sql, [addressId]);

            const address = result[0];

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Address retrieved successfully for ID ${addressId}`);

            callback(null, address);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting address', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    updateAddress: async (addressId, userId, addressType, fullAddress, landmark, city, state, pincode, updatedBy, callback) => {
        const methodName = 'updateAddress';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Updating address by ID ${addressId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_UpdateAddress(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            await db.query(sql, [addressId, userId, addressType, fullAddress, landmark, city, state, pincode, updatedBy]);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Address updated successfully for ID: ${addressId}`);

            callback(null, addressId);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error updating address', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    deleteAddressById: async (addressId, callback) => {
        const methodName = 'deleteAddressById';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Deleting address by ID ${addressId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_DeleteAddressById(?)`;

            await db.query(sql, [addressId]);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `Address deleted successfully with ID: ${addressId}`);

            callback(null, addressId);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error deleting address', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

}

module.exports = addressRepository;
