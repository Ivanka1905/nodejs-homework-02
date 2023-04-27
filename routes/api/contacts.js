const express = require("express");
const {
  getAll,
  getOne,
  add,
  deleteContact,
  updateOne,
} = require("../../controllers/api");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", add);

router.delete("/:id", deleteContact);

router.patch("/:id", updateOne);

module.exports = router;
