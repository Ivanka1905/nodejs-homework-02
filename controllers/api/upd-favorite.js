const { ContactModel } = require("../../models/db-contact");
const { updateContactSchema } = require("../../shemas");

async function updFavorite(req, res, next) {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const { error } = updateContactSchema.validate({ favorite });

    if (error || !favorite) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const updateStatusContact = await ContactModel.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    ).catch(() => {
      const err = Error(`Contact id "${req.params.id}" is not correct`);
      err.code = 400;
      throw err;
    });

    if (!updateStatusContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updateStatusContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updFavorite,
};
