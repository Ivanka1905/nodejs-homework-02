const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updSubscription,
  updAvatar,
} = require("../../controllers/auth");
const { controller } = require("../../services");
const { userAuthMidleware } = require("../../midlewares");
const { upload } = require("../../midlewares/uploader.js");
const router = express.Router();

router.post("/register", controller(register));
router.post("/login", controller(login));
router.post("/logout", userAuthMidleware, controller(logout));
router.get("/current", userAuthMidleware, controller(current));
router.patch("/", userAuthMidleware, controller(updSubscription));
router.patch(
  "/avatars",
  userAuthMidleware,
  upload.single("avatar"),
  controller(updAvatar)
);

module.exports = router;
