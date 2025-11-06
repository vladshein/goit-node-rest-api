import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

// const contactsPath = path.resolve("src", "db", "contacts.json");
const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
}

export async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
}

export async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

export async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    };
    contacts.push(newContact);
    console.log(`Contacts are: ${contacts}`);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}
