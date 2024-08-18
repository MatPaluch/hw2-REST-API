const Contact = require("./shemas/contact");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return Contact.deleteOne({ _id: contactId });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
