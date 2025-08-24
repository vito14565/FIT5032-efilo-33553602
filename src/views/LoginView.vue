<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Login</h2>

        <form @submit.prevent="handleLogin">
          <!-- Username input -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              class="form-control"
              required
            />
          </div>

          <!-- Password input -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              required
            />
          </div>

          <!-- Error message -->
          <div v-if="error" class="text-danger mb-3">{{ error }}</div>

          <!-- Submit button -->
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Form state
const username = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

// Demo credentials
const validUser = 'admin'
const validPass = '1234'

// Handle login
function handleLogin() {
  if (username.value === validUser && password.value === validPass) {
    // Save authentication state in localStorage
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/') // Redirect to Home after login
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>