import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   

// Bootstrap CSS/JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// PrimeVue setup
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// (optional) import icons if you plan to use them
// import 'primeicons/primeicons.css'

// Firebase Auth
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const app = createApp(App)

app.use(router)  
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')

// Listen to authentication state changes
// This will log the current user (null if logged out)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('[Auth] current user =', { uid: user.uid, email: user.email })
  } else {
    console.log('[Auth] current user = null')
  }
})