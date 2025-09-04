// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue' // 👈 add

// Firebase Auth
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },

  // Only admins should see About (optional but recommended)
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true, requiresRole: 'admin' } // 👈 role guard
  },

  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
    alias: ['/login'] // keep old /login working
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },

  // Logout page for Task 7.2 Screenshot set 2
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/** Wait for initial Firebase auth state (auth.currentUser is async) */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => { unsub(); resolve(user) },
      reject
    )
  })
}

/** Global guard: auth + (optional) role check */
router.beforeEach(async (to, from, next) => {
  try {
    // Require authentication?
    if (to.meta?.requiresAuth) {
      const user = await getCurrentUser()
      if (!user) {
        return next({ name: 'FireLogin', query: { redirect: to.fullPath } })
      }
    }

    // Require a specific role? (stored in localStorage by login flow)
    if (to.meta?.requiresRole) {
      const role = localStorage.getItem('role') || ''
      if (role !== to.meta.requiresRole) {
        console.warn('[Router Guard] insufficient role:', role)
        return next('/') // or redirect to a 403 page
      }
    }

    next()
  } catch (e) {
    console.error('[Router Guard] check failed:', e)
    next({ name: 'FireLogin' })
  }
})

export default router