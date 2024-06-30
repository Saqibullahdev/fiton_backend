const UnauthorizedError = require('../errors/unathorizederror');
const jwt = require('jsonwebtoken');
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch(error) {
        throw new UnauthorizedError(error.message || 'Invalid token');
    }
}

module.exports = {verifyToken};