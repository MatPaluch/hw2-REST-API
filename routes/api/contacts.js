const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  checkProperties,
  checkUpdateProperties,
} = require("../../models/checkProperties");
const { nanoid } = require("nanoid");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ data: await listContacts() });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact.length === 0) {
    res.status(404).json({ message: "Not found" });
  } else res.json({ data: contact });
});

router.post("/", async (req, res, next) => {
  const missingProps = checkProperties(req.body);

  if (missingProps.length === 0) {
    const { name, email, phone } = req.body;
    const body = { id: nanoid(), name, email, phone };
    const contact = await addContact(body);
    res
      .status(201)
      .json({ message: "Successfully added contact", data: contact });
  } else {
    res
      .status(400)
      .json({ message: `Missing required ${missingProps.join(", ")} field` });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const shouldRemove = await removeContact(contactId);

  if (shouldRemove) {
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    const valid = checkUpdateProperties(req.body);
    if (valid === true) {
      const { contactId } = req.params;

      const modifiedContact = await updateContact(contactId, req.body);
      if (modifiedContact === false) {
        res.status(404).json({ message: "Not found" });
      } else {
        res.json({ mess: "Contact updated!", data: modifiedContact });
      }
    } else {
      res.json({ message: valid });
    }
  } else {
    res.status(400).json({ message: `missing fields` });
  }
});

module.exports = router;
