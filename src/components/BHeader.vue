<template>
  <!-- Using Bootstrap header navigation -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <!-- Always show Home -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            Home
          </router-link>
        </li>

        <!-- Only show About if user is logged in -->
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>

        <!-- Show Login if NOT authenticated -->
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
        </li>

        <!-- Show Logout if authenticated -->
        <li class="nav-item" v-if="isAuthenticated">
          <button class="btn btn-link nav-link" @click="logout">
            Logout
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isAuthenticated = ref(false)

// Function to check auth state
function checkAuth() {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
}

// Run once on mount
onMounted(() => {
  checkAuth()
})

// Watch route changes → update state
router.afterEach(() => {
  checkAuth()
})

// Logout function
function logout() {
  localStorage.removeItem('isAuthenticated')
  isAuthenticated.value = false
  router.push('/login')
}
</script>

<style scoped>
.nav-link.active {
  background-color: #0d6efd;
  color: white;
}
</style>