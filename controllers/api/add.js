const { ContactModel } = require("../../models/db-contact");
const { errorService } = require("../../services");
const { addContactSchema } = require("../../shemas");

async function add(req, res, next) {
  const user = req.user;
  const { name, email, phone, favorite } = req.body;
  const { error } = addContactSchema.validate({
    name,
    email,
    phone,
    favorite,
  });
  if (error) {
    throw errorService("missing required name field", 400);
  }
  const contact = await ContactModel.create({
    name,
    email,
    phone,
    favorite,
    owner: user,
  });

  res.status(201).json(contact);
}

module.exports = {
  add,
};
