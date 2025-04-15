const Contact = require("../models/contact");
const contactsService = require("../services/contacts");
const createError = require("http-errors");

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.json({
    status: 200,
    message: "Successfully retrieved all contacts",
    data: contacts,
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);
  if (!contact) {
    throw createError(404, "Contact not found");
  }
  res.json({
    status: 200,
    message: "Successfully retrieved contact",
    data: contact,
  });
};

const createContact = async (req, res) => {
  const newContact = await contactsService.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactsService.updateContact(contactId, req.body);
  if (!updatedContact) {
    throw createError(404, "Contact not found");
  }
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.deleteContact(contactId);
  if (!result) {
    throw createError(404, "Contact not found");
  }
  res.status(204).end();
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};