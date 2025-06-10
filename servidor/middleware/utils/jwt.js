const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta_123';
const TOKEN_EXPIRY = '24h';

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Token inválido');
    }
};

module.exports = {
    generateToken,
    verifyToken
};
