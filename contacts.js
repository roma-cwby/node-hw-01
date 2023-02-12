const path = require('node:path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  return data.find(item => Number(item.id) === contactId);
}

async function removeContact(contactId) {
  let data = await listContacts();
  data = data.filter(item => Number(item.id) !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(data));
  return await listContacts();
}

async function addContact(name, email, phone) {
  let data = await listContacts();

  let newId = 0;
  data.map(item => {
    if (Number(item.id) > newId) newId = Number(item.id);
  });

  const newContact = { id: `${newId + 1}`, name, email, phone };
  data = [...data, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(data));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
