const { ContactModel } = require("../../models/db-contact");
const { errorService } = require("../../services");
const { updateContactSchema } = require("../../shemas");

async function updateOne(req, res, next) {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  const { error } = updateContactSchema.validate({
    name,
    email,
    phone,
    favorite,
  });
  if (error || (!name && !email && !phone && !favorite)) {
    throw errorService("missing fields", 400);
  }
  const updateContactItem = await ContactModel.findByIdAndUpdate(
    id,
    { name, email, phone, favorite },
    { new: true }
  ).catch(() => {
    throw errorService(`Contact id "${req.params.id}" is not correct`, 400);
  });

  if (updateContactItem === null) {
    throw errorService("Not found", 404);
  }
  return res.status(200).json(updateContactItem);
}

module.exports = {
  updateOne,
};
