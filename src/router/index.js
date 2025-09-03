// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue' // ← use the real file name

// Firebase Auth
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // pages that require authentication
  },
  {
    path: '/login',                // keep /login; or change to /FireLogin if you want to match the handout
    name: 'Login',
    component: FirebaseSigninView  // ← use the same component name here
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * Wait for the initial Firebase auth state.
 * auth.currentUser can be null until Firebase finishes initializing,
 * so we subscribe once then immediately unsubscribe.
 */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

// Global navigation guard: protect routes with meta.requiresAuth
router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    try {
      const user = await getCurrentUser()
      if (user) next()
      else next({ name: 'Login', query: { redirect: to.fullPath } })
    } catch (e) {
      console.error('[Router Guard] auth check failed:', e)
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router