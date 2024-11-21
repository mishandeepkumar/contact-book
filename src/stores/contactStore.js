const STORAGE_KEY = 'contacts'

export const contactStore = {
  contacts: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.contacts))
  },

  addContact(contact) {
    contact.id = Date.now().toString()
    this.contacts.push(contact)
    this.save()
    return contact
  },

  updateContact(contact) {
    const index = this.contacts.findIndex(c => c.id === contact.id)
    if (index !== -1) {
      this.contacts[index] = contact
      this.save()
    }
  },

  deleteContact(id) {
    this.contacts = this.contacts.filter(c => c.id !== id)
    this.save()
  },

  getContact(id) {
    return this.contacts.find(c => c.id === id)
  },

  getAllContacts() {
    return [...this.contacts].sort((a, b) => 
      a.lastName.localeCompare(b.lastName)
    )
  }
} 