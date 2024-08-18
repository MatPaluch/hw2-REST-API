const fs = require("fs/promises");
const path = require("path");

const filename = "contacts.json";
const filePath = path.join(__dirname, filename);

const listContacts = async () => {
  const response = await fs.readFile(filePath);
  return JSON.parse(response);
};

const getContactById = async (contactId) => {
  const response = await fs.readFile(filePath);
  const contactsList = JSON.parse(response);
  const contact = contactsList.find((obj) => obj.id === contactId);
  return contact;
};

const addContact = async (body) => {
  const rawFile = await fs.readFile(filePath);
  const contactsList = JSON.parse(rawFile);
  contactsList.push(body);
  await fs.writeFile(filePath, JSON.stringify(contactsList));

  return body;
};

const removeContact = async (contactId) => {
  const rawFile = await fs.readFile(filePath);
  const contactList = JSON.parse(rawFile);
  const indexContact = contactList.findIndex((obj) => obj.id === contactId);

  if (indexContact >= 0) {
    contactList.splice(indexContact, 1);
    await fs.writeFile(filePath, JSON.stringify(contactList));
    return true;
  } else {
    return false;
  }
};

const updateContact = async (contactId, body) => {
  const rawFile = await fs.readFile(filePath);
  const contactList = JSON.parse(rawFile);
  const indexContact = contactList.findIndex((obj) => obj.id === contactId);

  if (indexContact >= 0) {
    const contact = contactList[indexContact];
    for (let key in body) {
      if (contact.hasOwnProperty(key)) {
        contact[key] = body[key];
      }
    }
    contactList.splice(indexContact, 1, contact);
    await fs.writeFile(filePath, JSON.stringify(contactList));
    return contact;
  } else {
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
