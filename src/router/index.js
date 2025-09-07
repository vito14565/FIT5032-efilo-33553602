// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue' // ← new

// Firebase Auth
import { auth } from '../firebase/init'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },

  // Optional: only admins can access About
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true, requiresRole: 'admin' }
  },

  // Add Book page (per Lab 8.4.2). Public by default for the lab.
  // If you want it protected, add `meta: { requiresAuth: true }`.
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },

  // Auth flows
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
    alias: ['/login']
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },

  // Logout page triggers signOut inside the view
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

/**
 * Wait for the initial Firebase auth state to resolve.
 * (auth.currentUser is not immediately available on first load)
 */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => { unsub(); resolve(user) },
      reject
    )
  })
}

/**
 * Global guard: checks authentication and (optionally) role.
 * - Set `meta.requiresAuth` to protect a route.
 * - Set `meta.requiresRole` to enforce a specific role stored in localStorage.
 */
router.beforeEach(async (to, from, next) => {
  try {
    // Auth check
    if (to.meta?.requiresAuth) {
      const user = await getCurrentUser()
      if (!user) {
        return next({ name: 'FireLogin', query: { redirect: to.fullPath } })
      }
    }

    // Role check
    if (to.meta?.requiresRole) {
      const role = localStorage.getItem('role') || ''
      if (role !== to.meta.requiresRole) {
        console.warn('[Router Guard] insufficient role:', role)
        return next('/') // or point to a dedicated 403 page
      }
    }

    next()
  } catch (e) {
    console.error('[Router Guard] check failed:', e)
    next({ name: 'FireLogin' })
  }
})

export default router
