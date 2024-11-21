import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ContactList from './components/ContactList.vue'
import ContactDetails from './components/ContactDetails.vue'
import ContactForm from './components/ContactForm.vue'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ContactList },
    { path: '/contact/:id', component: ContactDetails, props: true },
    { path: '/new', component: ContactForm },
    { path: '/edit/:id', component: ContactForm, props: true }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app') 