// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Views
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue' // ← EFOLIO 9
import WeatherView from '../views/WeatherView.vue'           // ← EFOLIO 10 Weather
import GetAllBookAPI from '../views/GetAllBookAPI.vue'       // ← EFOLIO 10 API JSON

// Firebase Auth
import { auth } from '../firebase/init'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', name: 'Home', component: HomeView },

  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },

  { path: '/addbook', name: 'AddBook', component: AddBookView },

  { path: '/getBookCount', name: 'GetBookCount', component: GetBookCountView },

  { path: '/WeatherCheck', name: 'GetWeather', component: WeatherView },

  // ✅ Rename to match requirement
  { path: '/GetAllBookAPI', name: 'GetAllBookAPI', component: GetAllBookAPI },

  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView, alias: ['/login'] },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },

  { path: '/logout', name: 'Logout', component: LogoutView, meta: { requiresAuth: true } },

  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => { unsub(); resolve(user) },
      (err) => { unsub(); reject(err) },
    )
  })
}

router.beforeEach(async (to, _from, next) => {
  try {
    if (to.meta && to.meta.requiresAuth) {
      const user = await getCurrentUser()
      if (!user) return next({ name: 'FireLogin', query: { redirect: to.fullPath } })
    }
    if (to.meta && to.meta.requiresRole) {
      const role = localStorage.getItem('role') || ''
      if (role !== to.meta.requiresRole) return next('/')
    }
    next()
  } catch (e) {
    console.error('[Router Guard] check failed:', e)
    next({ name: 'FireLogin' })
  }
})

export default router