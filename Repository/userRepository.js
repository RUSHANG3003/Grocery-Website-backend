const pool = require('../config/db');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');

const logger = new Logger();
const RepositoryName = 'userRepository';

const userRepository = {

    updateUser: async (userId, userName, mobileNumber, updatedBy, callback) => {
        const methodName = 'updateUser';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Updating user ${userId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_UpdateUser(?, ?, ?, ?, @oId)`; // userId, userName, mobileNumber, updatedBy

            await db.query(sql, [userId, userName, mobileNumber, updatedBy]);

            const [rows] = await db.query('SELECT @oId as oId');
            const oId = rows[0].oId;

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `User updated successfully with ID: ${oId}`);

            callback(null, oId);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error updating user', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },

    getUserById: async (userId, callback) => {
        const methodName = 'getUserById';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Getting user ${userId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_GetUserById(?)`;

            const [result] = await db.query(sql, [userId]);

            // result[0] contains the result set from the SELECT in the procedure
            const user = result[0] && result[0][0] ? result[0][0] : null;

            if (user) {
                logger.log(RepositoryName, methodName,
                    LogType.logType.RELEASE,
                    `User retrieved successfully: ${userId}`);
            } else {
                logger.log(RepositoryName, methodName,
                    LogType.logType.RELEASE,
                    `User not found: ${userId}`);
            }

            callback(null, user);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error getting user', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },



};

module.exports = userRepository;