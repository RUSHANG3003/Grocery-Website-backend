const fs = require('fs');
const path = require('path');
const LogType = require('./logType');
const Config = require('../config/config');

class Logger {
    constructor() {
        // const date =new Date().toISOString().split('T')[0];
        const date = new Date().toLocaleDateString('en-CA', {
            timeZone: 'Asia/Kolkata'
        });
        this.logDir = path.resolve('logger/logs');
        this.logFilePath = path.join(this.logDir, `log-${date}.txt`);
        this.#logFileExists();
    }

    log(className, methodName, logType, message, exception = null) {

        if (!Object.values(LogType.logType).includes(logType)) {
            throw new Error(`Invalid logType: ${logType}`);
        }

        const logMessage = this.#formatLogMessage(className, methodName, logType, message, exception);

        if (Config.logLevel == LogType.logType.VERBOSE) {
            if (logType === LogType.logType.VERBOSE
                || logType === LogType.logType.DEBUG
                || logType === LogType.logType.RELEASE) {
                this.#writeToFile(logMessage);
            } else if (logType === LogType.logType.EXCEPTION) {
                this.#logException(logMessage);
            }
        } else if (Config.logLevel == LogType.logType.DEBUG) {
            if (logType === LogType.logType.DEBUG
                || logType === LogType.logType.RELEASE) {
                this.#writeToFile(logMessage);
            } else if (logType === LogType.logType.EXCEPTION) {
                this.#logException(logMessage);
            }
        } else if (Config.logLevel == LogType.logType.RELEASE) {
            if (logType === LogType.logType.RELEASE) {
                this.#logException(logMessage);
            } else if (logType === LogType.logType.EXCEPTION) {
                this.#logException(logMessage);
            }
        } else if (Config.logLevel == LogType.logType.EXCEPTION) {
            if (logType === LogType.logType.EXCEPTION) {
                this.#logException(logMessage);
            }
        } else {
            // Invalid log level case. No need to log anything
        }
    }



    #logException(logMessage) {
        this.#writeToFile(logMessage);
    }
    #logFileExists() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true }); // Create directory if it doesn't exist
        }
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, ''); // Create an empty log file if it doesn't exist
        }
    }

    #formatLogMessage(className, methodName, logType, message, exception) {
        // const timestamp = new Date().toISOString();

        const now = new Date();
        const date = now.toLocaleDateString('en-CA', {
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-GB', {
            timeZone: 'Asia/Kolkata',
            hour12: false
        });

        const timestamp = `${date}T${time} IST`;

        return `${timestamp} | ${logType.toUpperCase()} | ${className}.${methodName} | ${message}${exception ? ' | ' + exception : ''}\n`;
    }

    #writeToFile(logMessage) {
        fs.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }
}


module.exports = Logger;
