require("dotenv").config();
const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRES } = process.env;

const createJWT = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: `${JWT_EXPIRES}s` });
  return token;
};

const verifyJWT = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { createJWT, verifyJWT };
