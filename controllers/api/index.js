const { updateOne } = require("./update-one");
const { add } = require("./add");
const { deleteContact } = require("./delete");
const { getAll } = require("./get-all");
const { getOne } = require("./get-one");
const { updFavorite } = require("./upd-favorite");

module.exports = {
  getAll,
  getOne,
  add,
  deleteContact,
  updateOne,
  updFavorite,
};
