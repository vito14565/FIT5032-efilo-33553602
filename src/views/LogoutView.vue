<template>
  <div class="container mt-5">
    <h2 class="text-center">You have been logged out</h2>
    <p class="text-center text-muted">Please log in again if you want to continue.</p>
    <div class="text-center mt-3">
      <router-link to="/FireLogin" class="btn btn-primary">
        Go to Login
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/init'

const router = useRouter()

onMounted(async () => {
  try {
    const user = auth.currentUser
    console.log('[LogoutView] current user before logout:', user?.email, user?.uid)

    await signOut(auth)

    console.log('[LogoutView] User has been logged out successfully.')
    localStorage.removeItem('role')
  } catch (e) {
    console.error('[LogoutView] Logout failed:', e)
  }
})
</script>