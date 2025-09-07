// src/firebase/init.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWa88gHRMMEYNxJ9I2zW761C7hLw5J80E',
  authDomain: 'bookproject-weihsiang-ce46d.firebaseapp.com',
  projectId: 'bookproject-weihsiang-ce46d',
  storageBucket: 'bookproject-weihsiang-ce46d.appspot.com',
  messagingSenderId: '454274807799',
  appId: '1:454274807799:web:b9c82115cb42b8bc2720f2'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export auth (kept for your login/register pages)
export const auth = getAuth(app)

// Export Firestore as default (matches course material)
const db = getFirestore(app)
export default db