<template>
  <div class="contact-list">
    <div class="actions">
      <router-link to="/new" class="add-button">
        <span class="mdi mdi-plus"></span> Add Contact
      </router-link>
      <div class="search">
        <select name="filter" v-model="filter" id="filter-select">
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>
        <input type="text" v-model="searchQuery" placeholder="Search contacts...">
      </div>
    </div>

    <div class="contacts">
      <div v-for="contact in filteredContacts" :key="contact.id" class="contact-item">
        <router-link :to="`/contact/${contact.id}`" class="link">
          {{ filter === 'firstName' ? contact.firstName + ' ' + contact.lastName : contact.lastName + ' ' +
            contact.firstName }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { contactStore } from '../stores/contactStore'

export default {
  setup() {
    const searchQuery = ref('');
    const filter = ref('lastName');

    const filteredContacts = computed(() => {
      const query = searchQuery.value.toLowerCase()
      return contactStore.getAllContacts().sort((a, b) => {
        if (filter.value === 'firstName') {
          return a.firstName.localeCompare(b.firstName);
        }
        return a.lastName.localeCompare(b.lastName);
      }).filter(contact =>
        contact.firstName.toLowerCase().includes(query) ||
        contact.lastName.toLowerCase().includes(query)
      )
    })

    return {
      searchQuery,
      filter,
      filteredContacts
    }
  }
}
</script>

<style scoped>
.contact-list {
  padding: 0px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 8px;
}

@media screen and (max-width:600px) {
  .actions {
    flex-direction: column;
  }
}

.add-button {
  background-color: #00371e;
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  text-decoration: none;
  width: fit-content;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search select {
  padding: 10px 12px;
  border-radius: 8px;
  background-color: #eee;
  border: 1px solid #ccc;
}

.search input {
  padding: 10px 12px;
  border-radius: 8px;
  background-color: #eee;
  border: 1px solid #ccc;
  width: 100%;
}

.contact-item {
  border-bottom: 1px solid #ccc;
}

.contact-item .link{
  padding: 10px;
  width: 100%;
  display: flex;
}
.contact-item .link:hover{
  background-color: #eee;
}

.contact-item a {
  text-decoration: none;
  color: #2c3e50;
}

.contact-item a:hover {
  color: #00371e;
}
</style>