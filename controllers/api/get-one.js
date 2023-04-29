const { ContactModel } = require("../../models/db-contact");

async function getOne(req, res, next) {
  try {
    const contact = await ContactModel.findById(req.params.id).catch(() => {
      const err = Error(`Contact id "${req.params.id}" is not correct`);
      err.code = 400;
      throw err;
    });

    if (contact === null) {
      return res.status(404).send({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOne,
};
