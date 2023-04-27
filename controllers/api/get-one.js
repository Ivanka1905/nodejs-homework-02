const contacts = require("../../models/contacts");

async function getOne(req, res, next) {
  try {
    const contact = await contacts.getContactById(req.params.id);

    if (!contact) {
      res.status(404).send({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOne,
};
