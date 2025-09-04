<template>
  <!-- Using Bootstrap header navigation -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <!-- Always show Home -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            Home
          </router-link>
        </li>

        <!-- Only show About if user is admin -->
        <li class="nav-item" v-if="isAuthenticated && role === 'admin'">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>

        <!-- Show Login/Register if NOT authenticated -->
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Login
          </router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Register
          </router-link>
        </li>

        <!-- Show Logout if authenticated -->
        <li class="nav-item" v-if="isAuthenticated">
          <button class="btn btn-link nav-link" @click="logout">
            Logout
          </button>
        </li>
      </ul>

      <!-- Show current user email and role when authenticated -->
      <div v-if="isAuthenticated" class="small text-muted">
        {{ currentEmail }} ({{ role }})
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const router = useRouter()
const route = useRoute()

// reactive auth state
const isAuthenticated = ref(false)
const currentEmail = ref('')
const role = ref('')

// keep unsubscribe function
let unsubscribeAuth = null

// subscribe to Firebase auth state
onMounted(() => {
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user
    currentEmail.value = user?.email ?? ''
    // get role from localStorage (set during login)
    role.value = localStorage.getItem('role') || ''
  })
})

// cleanup listener
onUnmounted(() => {
  if (typeof unsubscribeAuth === 'function') unsubscribeAuth()
})

// sign out and redirect to FireLogin
async function logout() {
  try {
    await signOut(auth)
    localStorage.removeItem('role')
    router.push({ name: 'FireLogin', query: { redirect: route.fullPath } })
  } catch (e) {
    console.error('[Logout] failed:', e)
  }
}
</script>

<style scoped>
.nav-link.active {
  background-color: #0d6efd;
  color: #fff;
}
</style>