const express = require("express");
const router = express.Router();
const contactOperations = require("../controller/contacts.js");

router.get("/", contactOperations.getAllContacts);

router.get("/:contactId", contactOperations.getContactById);

router.post("/", contactOperations.createContact);

router.delete("/:contactId", contactOperations.deleteContact);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
