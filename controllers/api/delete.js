const contacts = require("../../models/contacts");

async function deleteContact(req, res, next) {
  try {
    const contact = await contacts.removeContact(req.params.id);
    
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
