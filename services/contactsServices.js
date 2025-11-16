import * as fs from "node:fs/promises";
import * as path from "node:path";

import Contact from "../db/models/Contact.js";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
    return await Contact.findAll();
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    return await Contact.findByPk(contactId);
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    await contact.destroy();
    return contact;
}

async function addContact(name, email, phone, favorite = false) {
    // // ...твій код. Повертає об'єкт доданого контакту (з id).
    const newContact = Movie.create({ name, email, phone, favorite });
    return newContact;
}

async function updateContact(id, name, email, phone, favorite) {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;
    updatedContact = { name, email, phone, favorite };

    await contact.update(updatedContact);
}

async function updateContactFavorite(id, payload) {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;

    await contact.update(payload);
    return contact;
}

export default {
    listContacts,
    addContact,
    removeContact,
    getContactById,
    updateContact,
    updateContactFavorite,
};
