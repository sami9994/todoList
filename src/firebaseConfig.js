// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  // apiKey: 'AIzaSyA7flcog2m8d3lNRIAKA7IUfZARgg9sN9E',
  // authDomain: 'todolist-a4eb4.firebaseapp.com',
  // projectId: 'todolist-a4eb4',
  // storageBucket: 'todolist-a4eb4.appspot.com',
  // messagingSenderId: '779049291070',
  // appId: '1:779049291070:web:6d0401b79f27bd4f20706f',
  // measurementId: 'G-54805V69DR',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(app)
