<template>
  <div class="contact-form">
    <h3>{{ isEditing ? 'Edit Contact' : 'New Contact' }}</h3>
    <form @submit.prevent="saveContact">
      <div class="form-group">
        <label for="firstName">First Name*</label>
        <input 
          id="firstName"
          v-model="form.firstName"
          required
          type="text"
          placeholder="enter first name"
          >
        </div>
        
      <div class="form-group">
        <label for="lastName">Last Name*</label>
        <input 
        id="lastName"
          v-model="form.lastName"
          required
          type="text"
          placeholder="enter last name"
          >
        </div>
        
        <div class="form-group">
          <label for="email">Email*</label>
          <input 
          id="email"
          v-model="form.email"
          required
          type="email"
          placeholder="enter email"
          >
        </div>
        
        <div class="form-group">
          <label for="phone">Phone</label>
          <input 
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="enter phone number"
          >
        </div>
        
        <div class="form-group">
          <label for="address">Address</label>
        <textarea 
        id="address"
        v-model="form.address"
        placeholder="enter address"
        ></textarea>
      </div>

      <button type="submit" class="submit-button">
        {{ isEditing ? 'Update Contact' : 'Create Contact' }}
      </button>
    </form>
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
    const isEditing = ref(false)
    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    })

    onMounted(() => {
      if (props.id) {
        isEditing.value = true
        const contact = contactStore.getContact(props.id)
        if (contact) {
          form.value = { ...contact }
        }
      }
    })

    const saveContact = () => {
      if (isEditing.value) {
        contactStore.updateContact(form.value)
      } else {
        const newContact = contactStore.addContact(form.value)
        router.push(`/contact/${newContact.id}`)
      }
      router.push(`/contact/${form.value.id}`)
    }

    return {
      form,
      isEditing,
      saveContact
    }
  }
}
</script>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 8px;
}

textarea {
  height: 100px;
}

.submit-button {
  background-color: #00371e;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #3aa876;
}
</style> 