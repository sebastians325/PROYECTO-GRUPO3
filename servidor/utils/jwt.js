const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "clave_secreta_123", { expiresIn: "1d" });
};
