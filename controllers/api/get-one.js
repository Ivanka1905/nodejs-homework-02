const { ContactModel } = require("../../models/db-contact");
const { errorService } = require("../../services");

async function getOne(req, res, next) {
  const contact = await ContactModel.findById(req.params.id).catch(() => {
    throw errorService(`Contact id "${req.params.id}" is not correct`, 400);
  });

  if (contact === null) {
    throw errorService("Not found", 404);
  }
  res.json(contact);
}

module.exports = {
  getOne,
};
