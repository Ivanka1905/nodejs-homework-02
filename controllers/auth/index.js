const { current } = require("./current");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { updSubscription } = require("./upd-subscription");

module.exports = {
    register,
    login,
    logout,
    current,
    updSubscription,
} 