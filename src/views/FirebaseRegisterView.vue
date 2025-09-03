<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Register</h2>

        <!-- Success message -->
        <div
          v-if="successMessage"
          class="alert alert-success text-center"
          role="alert"
        >
          {{ successMessage }}
        </div>

        <form v-if="!successMessage" @submit.prevent="register">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="form-control"
              required
            />
          </div>
          <div v-if="error" class="text-danger mb-3">{{ error }}</div>
          <button type="submit" class="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const successMessage = ref('')
const router = useRouter()
const auth = getAuth()

const register = async () => {
  error.value = ''
  successMessage.value = ''
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    )
    console.log('Firebase Register Successful!', cred.user)

    // Immediately sign out so user must login manually
    await signOut(auth)

    // Show success message
    successMessage.value = 'Registration successful! Please log in.'

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/FireLogin')
    }, 2000)
  } catch (e) {
    console.error(e)
    error.value = e.message
  }
}
</script>