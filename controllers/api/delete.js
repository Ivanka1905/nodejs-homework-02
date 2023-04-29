const { ContactModel } = require("../../models/db-contact");

async function deleteContact(req, res, next) {
  try {
    const contact = await ContactModel.findByIdAndDelete(req.params.id).catch(
      () => {
        const err = Error(`Contact id "${req.params.id}" is not correct`);
        err.code = 400;
        throw err;
      }
    );

    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json("contact deleted");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteContact,
};
