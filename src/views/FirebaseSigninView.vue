<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Login</h2>

        <!-- Login form -->
        <form @submit.prevent="handleLogin">
          <!-- Email input -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
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
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

// Form state
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()

// Handle login with Firebase
async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('[Login] user =', { uid: cred.user.uid, email: cred.user.email })
    router.push('/') // Redirect to Home after login
  } catch (e) {
    console.error(e)
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>