const { ContactModel } = require("../../models/db-contact");
const { addContactSchema } = require("../../shemas");

async function add(req, res, next) {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = addContactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const contact = await ContactModel.create({ name, email, phone, favorite });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  add,
};
