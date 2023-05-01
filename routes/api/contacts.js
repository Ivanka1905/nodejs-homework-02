const express = require("express");
const { userAuthMidleware } = require("../../midlewares");
const {
  getAll,
  getOne,
  add,
  deleteContact,
  updateOne,
  updFavorite,
} = require("../../controllers/api");
const { controller } = require("../../services");

const router = express.Router();

router.get("/", userAuthMidleware, controller(getAll));
router.get("/:id", userAuthMidleware, controller(getOne));
router.post("/", userAuthMidleware, controller(add));
router.delete("/:id", userAuthMidleware, controller(deleteContact));
router.patch("/:id", userAuthMidleware, controller(updateOne));
router.patch("/:id/favorite", userAuthMidleware, controller(updFavorite));

module.exports = router;
