const { controller } = require("./controller");
const { errorService } = require("./error.service");
const { createHash } = require("./hashing.service");
const { createJWT, verifyJWT } = require("./jwt.service");
const { sendVerificationLetter } = require("./sendEmail.service");

module.exports = {
  createHash,
  errorService,
  createJWT,
  verifyJWT,
  controller,
  sendVerificationLetter,
};
