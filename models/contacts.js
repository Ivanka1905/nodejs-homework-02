const fsp = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function rewriteContactsList(a) {
  const newList = await fsp.writeFile(
    contactsPath,
    JSON.stringify(a, null, "\t")
  );
  return newList;
}

async function listContacts() {
  const allContacts = await fsp.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(({ id }) => id === contactId);
  console.log(contactById);
  return contactById;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const findById = await allContacts.find(({ id }) => id === contactId);
  if (!findById) return null;
  const filteredContacts = await allContacts.filter(
    (contact) => contact.id !== findById.id
  );
  rewriteContactsList(filteredContacts);
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  console.log(newContact);
  const allContacts = await listContacts();
  rewriteContactsList([newContact, ...allContacts]);
  return newContact;
}

async function updateContact(id, data) {
  const allContacts = await listContacts();
  const contactToChange = await allContacts.find(
    (contact) => contact.id === id
  );
  if (!contactToChange) return null;
  rewriteContactsList(allContacts, Object.assign(contactToChange, { ...data }));
  return Object.assign(contactToChange, { ...data });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
