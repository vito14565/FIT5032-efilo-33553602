// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'

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
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
    alias: ['/login'] // keep old /login working
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/** Wait for initial Firebase auth state */
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => { unsubscribe(); resolve(user) },
      reject
    )
  })
}

// Protect routes that require auth
router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.requiresAuth) {
    try {
      const user = await getCurrentUser()
      if (user) next()
      else next({ name: 'FireLogin', query: { redirect: to.fullPath } })
    } catch (e) {
      console.error('[Router Guard] auth check failed:', e)
      next({ name: 'FireLogin' })
    }
  } else {
    next()
  }
})

export default router