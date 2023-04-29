const { ContactModel } = require("../../models/db-contact");
const { updateContactSchema } = require("../../shemas");

async function updateOne(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const { error } = updateContactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error || (!name && !email && !phone && !favorite)) {
      return res.status(400).json({ message: "missing fields" });
    }
    const updateContactItem = await ContactModel.findByIdAndUpdate(
      id,
      { name, email, phone, favorite },
      { new: true }
    ).catch(() => {
      const err = Error(`Contact id "${req.params.id}" is not correct`);
      err.code = 400;
      throw err;
    });

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
