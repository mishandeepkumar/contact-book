<template>
  <div class="contact-details" v-if="contact">
    <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
    <div class="info">
      <p><strong>Email:</strong> {{ contact.email }}</p>
      <p v-if="contact.phone"><strong>Phone:</strong> {{ contact.phone }}</p>
      <p v-if="contact.address"><strong>Address:</strong> {{ contact.address }}</p>
    </div>
    <div class="actions">
      <router-link :to="`/edit/${contact.id}`" class="edit-button">
        <span class="mdi mdi-pencil"></span> Edit
      </router-link>
      <button @click="deleteContact" class="delete-button">
        <span class="mdi mdi-delete"></span> Delete
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { contactStore } from '../stores/contactStore'

export default {
  props: ['id'],
  setup(props) {
    const router = useRouter()
    const contact = ref(null)

    onMounted(() => {
      contact.value = contactStore.getContact(props.id)
    })

    const deleteContact = () => {
      if (confirm('Are you sure you want to delete this contact?')) {
        contactStore.deleteContact(props.id)
        router.push('/')
      }
    }

    return {
      contact,
      deleteContact
    }
  }
}
</script>

<style scoped>


.info {
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-button, .delete-button {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.edit-button {
  background-color: #00371e;
  color: white;
  text-decoration: none;
}

.delete-button {
  background-color: #8b0202;
  color: white;
}
</style> 