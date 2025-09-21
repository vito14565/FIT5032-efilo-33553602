// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue' // ← added

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
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },

  // Add Book page (public for lab)
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },

  // Get Book Count page (for EFOLIO 9.3/9.2.1)
  {
    path: '/getBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
  },

  // Auth flows
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
    alias: ['/login'],
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },

  // Logout page triggers signOut inside the view
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView,
    meta: { requiresAuth: true },
  },

  // (optional) 404 fallback
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/** Wait for the initial Firebase auth state to resolve. */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        unsub()
        resolve(user)
      },
      (err) => {
        unsub()
        reject(err)
      },
    )
  })
}

/** Global guard: checks authentication and (optionally) role. */
router.beforeEach(async (to, _from, next) => {
  try {
    // Auth check
    if (to.meta && to.meta.requiresAuth) {
      const user = await getCurrentUser()
      if (!user) {
        return next({ name: 'FireLogin', query: { redirect: to.fullPath } })
      }
    }

    // Role check
    if (to.meta && to.meta.requiresRole) {
      const role = localStorage.getItem('role') || ''
      if (role !== to.meta.requiresRole) {
        console.warn('[Router Guard] insufficient role:', role)
        return next('/')
      }
    }

    next()
  } catch (e) {
    console.error('[Router Guard] check failed:', e)
    next({ name: 'FireLogin' })
  }
})

export default router