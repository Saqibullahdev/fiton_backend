function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch(error) {
        throw new UnauthorizedError();
    }
}

module.exports = {verifyToken};