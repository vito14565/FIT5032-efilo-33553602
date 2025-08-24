import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   

// Bootstrap CSS/JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// PrimeVue setup
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// (optional) icons if you'll use them later
// import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)  
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')