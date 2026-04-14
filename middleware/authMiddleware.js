const jwt = require('jsonwebtoken');
const config = require('../config/config');
const FailureResponse = require('../response/failureResponse');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json(new FailureResponse(false, 'Access denied. No token provided.', '401'));
    }

    jwt.verify(token, config.tokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json(new FailureResponse(false, 'Invalid token.', '403'));
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
