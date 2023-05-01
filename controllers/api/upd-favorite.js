const { ContactModel } = require("../../models/db-contact");
const { errorService } = require("../../services");
const { updateContactSchema } = require("../../shemas");

async function updFavorite(req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;
  const { error } = updateContactSchema.validate({ favorite });

  if (error || !favorite) {
    throw errorService("missing field favorite", 400);
  }
  const updateStatusContact = await ContactModel.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  ).catch(() => {
    throw errorService(`Contact id "${req.params.id}" is not correct`, 400);
  });

  if (!updateStatusContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(updateStatusContact);
}

module.exports = {
  updFavorite,
};
