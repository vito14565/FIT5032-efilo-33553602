<template>
  <!-- Bootstrap header navigation -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <!-- Always show Home -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>

        <!-- Always show Add Book (per lab 8.4.2) -->
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <!-- New: Get Book Count (EFOLIO 9.3 / 9.2.1) -->
        <li class="nav-item">
          <router-link to="/getBookCount" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>

        <!-- Only show About when user is admin -->
        <li class="nav-item" v-if="isAuthenticated && role === 'admin'">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <!-- Show Login/Register when NOT authenticated -->
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Register</router-link>
        </li>

        <!-- Show Logout when authenticated -->
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/logout" class="nav-link" active-class="active">Logout</router-link>
        </li>
      </ul>

      <!-- Show current user email and role when authenticated -->
      <div v-if="isAuthenticated" class="small text-muted" aria-live="polite">
        {{ currentEmail }} ({{ role }})
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/init'

const isAuthenticated = ref(false)
const currentEmail = ref('')
const role = ref('')

let unsubscribeAuth = null

onMounted(() => {
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user
    currentEmail.value = user?.email ?? ''
    role.value = localStorage.getItem('role') || ''
  })
})

onUnmounted(() => {
  if (typeof unsubscribeAuth === 'function') {
    unsubscribeAuth()
    unsubscribeAuth = null
  }
})
</script>

<style scoped>
.nav-link.active {
  background-color: #0d6efd;
  color: #fff;
}
</style>