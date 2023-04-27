const contacts = require("../../models/contacts");

async function getAll(req, res, next) {
  try {
    res.status(200).json(await contacts.listContacts());
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
};
