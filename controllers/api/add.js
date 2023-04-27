const contacts = require("../../models/contacts");
const { addContactSchema } = require("../../shemas");

async function add(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    const { error } = addContactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const contact = await contacts.addContact(name, email, phone);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  add,
};
