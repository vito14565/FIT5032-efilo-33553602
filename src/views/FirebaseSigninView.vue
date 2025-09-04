<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Login</h2>

        <!-- Success message -->
        <div
          v-if="successMessage"
          class="alert alert-success text-center"
          role="alert"
        >
          {{ successMessage }}
        </div>

        <!-- Login form -->
        <form v-if="!successMessage" @submit.prevent="handleLogin">
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
import { useRouter, useRoute } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { auth } from '../firebase'

// Form state
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const successMessage = ref('')

const router = useRouter()
const route = useRoute()
const db = getFirestore()

// Handle login with Firebase
async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('[Login] user =', { uid: cred.user.uid, email: cred.user.email })

    // 🔑 Fetch role from Firestore
    const userDoc = await getDoc(doc(db, 'users', cred.user.uid))
    if (userDoc.exists()) {
      const role = userDoc.data().role
      localStorage.setItem('role', role)
      console.log('[Login] role =', role)
    } else {
      console.warn('[Login] No role found in Firestore!')
    }

    // Show success message
    successMessage.value = 'Login successful! Redirecting...'

    // Redirect after 2 seconds (either to intended page or home)
    setTimeout(() => {
      const redirect = route.query.redirect || '/'
      router.push(redirect)
    }, 2000)
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