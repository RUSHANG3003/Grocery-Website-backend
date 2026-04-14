const pool = require('../config/db');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const { sendOtpEmail } = require('../utils/emailUtils');

const logger = new Logger();
const RepositoryName = 'otpRepository';

const otpRepository = {

    sendOTP: async (emailId, callback) => {
        const methodName = 'sendOTP';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Generating OTP for ${emailId}`);

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const sql = `CALL usp_AddOTP(?, ?,@OId)`; // email, otp

            //  const [rows] = await db.query('SELECT @OId as OId');

            db = await pool.promise().getConnection();

            await db.query(sql, [emailId, otp]);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                'OTP stored in DB');

            await sendOtpEmail(emailId, otp);

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                'OTP email sent');

            callback(null, otp);

        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error sending OTP', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    },
    verifyOTP: async (emailId, otp, callback) => {
        const methodName = 'verifyOTP';
        let db = null;

        try {
            logger.log(RepositoryName, methodName,
                LogType.logType.VERBOSE,
                `Verifying OTP for ${emailId}`);

            db = await pool.promise().getConnection();

            const sql = `CALL usp_VerifyOTP(?, ?, @userId, @status)`; // email, otp

            await db.query(sql, [emailId, otp]);

            const [rows] = await db.query('SELECT @userId as userId, @status as status');
            const userId = rows[0].userId;
            const status = rows[0].status;

            let role = "USER";

            if (status === 1 && userId) {
                const [userData] = await db.query(
                    "SELECT role FROM user_tbl WHERE user_id_pk = ?",
                    [userId]
                );

                if (userData.length > 0) {
                    role = userData[0].role;
                }
            }

            // await db.query(sql, [emailId, otp]);

            // const status = result[0][0].status;

            logger.log(RepositoryName, methodName,
                LogType.logType.RELEASE,
                `OTP verify status: ${status}`);

            callback(null, status, userId, role);



        } catch (err) {
            logger.log(RepositoryName, methodName,
                LogType.logType.EXCEPTION,
                'Error verifying OTP', err.stack);

            callback(err);

        } finally {
            if (db) db.release();
        }
    }

};

module.exports = otpRepository;