const FailureResponse = require('../response/failureResponse');
const SuccessResponse = require('../response/successReponse');
const Logger = require('../logger/logger');
const LogType = require('../logger/logType');
const otpRepository = require('../Repository/otpRepository');
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const logger = new Logger();
const controllerName = 'otpController';
const otpController = {

    sendOTP: (req, res) => {
        const methodName = 'sendOTP';
        const { emailId } = req.body;

        logger.log(controllerName, methodName, LogType.logType.VERBOSE,
            'Initiating OTP send process', JSON.stringify(req.body));

        if (!emailId) {
            return res.status(400).json(
                new FailureResponse(false, 'Email is required', '400')
            );
        }

        otpRepository.sendOTP(emailId, (err, otp) => {
            if (err) {
                logger.log(controllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to send OTP', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to send OTP', '500')
                );
            }

            logger.log(controllerName, methodName,
                LogType.logType.RELEASE,
                'OTP sent successfully', JSON.stringify({ emailId }));

            return res.status(200).json(
                new SuccessResponse(true, {
                    emailId,
                    message: 'OTP sent successfully'
                })
            );
        });
    },

    verifyOTP: (req, res) => {
        const methodName = 'verifyOTP';
        const { emailId, otp } = req.body;

        logger.log(controllerName, methodName, LogType.logType.VERBOSE,
            'Initiating OTP verify process', JSON.stringify(req.body));

        if (!emailId || !otp) {
            return res.status(400).json(
                new FailureResponse(false, 'Email and OTP are required', '400')
            );
        }

        otpRepository.verifyOTP(emailId, otp, (err, status, userId, role) => {
            if (err) {
                logger.log(controllerName, methodName,
                    LogType.logType.EXCEPTION,
                    'Failed to verify OTP', err.stack);

                return res.status(500).json(
                    new FailureResponse(false, 'Failed to verify OTP', '500')
                );
            }

            if (status === 1) {

                const token = jwt.sign(
                    { userId, emailId, role },
                    config.tokenSecret, { expiresIn: "365d" });

                logger.log(controllerName, methodName,
                    LogType.logType.RELEASE,
                    'OTP verified successfully', JSON.stringify({ emailId }));

                return res.status(200).json(
                    new SuccessResponse(true, {
                        emailId,
                        userId,
                        role,
                        token,
                        message: 'OTP verified successfully'
                    })
                );
            } else {
                logger.log(controllerName, methodName,
                    LogType.logType.RELEASE,
                    'OTP verification failed', JSON.stringify({ emailId }));

                return res.status(400).json(
                    new FailureResponse(false, 'OTP verification failed', '400')
                );
            }
        });
    }

};

module.exports = otpController;