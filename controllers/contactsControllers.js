import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsService.listContacts();
    console.log(contacts);
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const contact = await contactsService.getContactById(req.params.id);
    if (contact) {
        res.json(contact);
    } else {
        throw HttpError(404, "Not found");
    }
};

export const deleteContact = async (req, res) => {
    const contact = await contactsService.removeContact(req.params.id);
    if (contact) {
        res.json(contact);
    } else {
        throw HttpError(404, "Not found");
    }
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await contactsService.addContact(name, email, phone);
    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const { name, email, phone } = req.body;

    const contact = await contactsService.updateContact(req.params.id, name, email, phone);
    if (contact) {
        res.status(200).json(contact);
    } else {
        throw HttpError(404, `Not found`);
    }
};
