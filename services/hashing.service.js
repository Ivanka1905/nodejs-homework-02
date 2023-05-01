const bcrypt = require("bcrypt");

const createHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = {
  createHash,
};
