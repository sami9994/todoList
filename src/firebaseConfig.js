// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA7flcog2m8d3lNRIAKA7IUfZARgg9sN9E',
  authDomain: 'todolist-a4eb4.firebaseapp.com',
  projectId: 'todolist-a4eb4',
  storageBucket: 'todolist-a4eb4.appspot.com',
  messagingSenderId: '779049291070',
  appId: '1:779049291070:web:6d0401b79f27bd4f20706f',
  measurementId: 'G-54805V69DR',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth()
export const db = getFirestore(app)
