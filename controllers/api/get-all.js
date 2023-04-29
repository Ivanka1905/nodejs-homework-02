const { ContactModel } = require("../../models/db-contact");

async function getAll(req, res, next) {
  try {
    res.status(200).json(await ContactModel.find({}));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
};
