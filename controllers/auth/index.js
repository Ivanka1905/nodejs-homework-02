const { current } = require("./current");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { secondTryVerify } = require("./second-try-verify");
const { updSubscription } = require("./upd-subscription");
const { verifyEmail } = require("./verify-email");

module.exports = {
    register,
    login,
    logout,
    current,
    updSubscription,
    verifyEmail,
    secondTryVerify,
} 