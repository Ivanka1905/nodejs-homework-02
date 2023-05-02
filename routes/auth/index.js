const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updSubscription,
  verifyEmail,
  secondTryVerify,
} = require("../../controllers/auth");
const { controller } = require("../../services");
const { userAuthMidleware } = require("../../midlewares/user-auth.midleware");
const router = express.Router();

router.post("/register", controller(register));
router.post("/login", controller(login));
router.post("/logout", userAuthMidleware, controller(logout));
router.get("/current", userAuthMidleware, controller(current));
router.patch("/", userAuthMidleware, controller(updSubscription));
router.get("/verify/:verificationToken", controller(verifyEmail));
router.post('/verify', controller(secondTryVerify))

module.exports = router;
