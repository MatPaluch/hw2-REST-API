const mongoose = require("mongoose");
const services = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const results = await services.listContacts();
    res.json({
      status: "Success",
      code: 200,
      message: "Successful received contacts list!",
      data: {
        contacts: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "Invalid contact ID format.",
      });
    }

    const result = await services.getContactById(contactId);
    if (result) {
      res.json({
        status: "Success",
        code: 200,
        message: "Successful found contact!",
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Contact doesn't exist.",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "Invalid contact ID format.",
      });
    }

    const result = await services.removeContact(contactId);
    if (result) {
      res.json({
        status: "Success",
        code: 200,
        message: "Successful removed contact!",
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: "Error",
        code: 404,
        message: "Contact doesn't exist.",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await services.addContact(req.body);
    res.json({
      status: "Success",
      code: 200,
      message: "Successful added contact!",
      data: {
        contact: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
};
