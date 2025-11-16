import Contact from "../db/models/Contact.js";

async function listContacts() {
    return await Contact.findAll();
}

async function getContactById(contactId) {
    return await Contact.findByPk(contactId);
}

async function removeContact(contactId) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;

    await contact.destroy();
    return contact;
}

async function addContact(name, email, phone, favorite = false) {
    const newContact = Contact.create({ name, email, phone, favorite });
    return newContact;
}

async function updateContact(id, name, email, phone, favorite) {
    const contact = await Contact.findByPk(id);
    if (!contact) return null;

    const updatedContact = { name, email, phone, favorite };
    return await contact.update(updatedContact);
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
