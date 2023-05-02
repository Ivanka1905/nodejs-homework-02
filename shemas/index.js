const { addContactSchema } = require("./add-contact.shemas");
const { addUserShema, secondEmailShema } = require("./add-user.shema");
const { updateContactSchema } = require("./update-contact.schema");

module.exports = {
  addContactSchema,
  updateContactSchema,
  addUserShema,
  secondEmailShema,
};
