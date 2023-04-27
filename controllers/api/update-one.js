const contacts = require("../../models/contacts");
const { updateContactSchema } = require("../../shemas");

async function updateOne(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { error } = updateContactSchema.validate({ name, email, phone });
    if (error || (!name && !email && !phone)) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updateContactItem = await contacts.updateContact(id, req.body);
    if (updateContactItem === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updateContactItem);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateOne,
};
