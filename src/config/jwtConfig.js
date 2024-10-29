const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};
