import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  const provider = new GoogleAuthProvider()
  const signIn = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        // const token = credential.accessToken

        const userInfo = result.user
        if (userInfo) {
          console.log(userInfo)
          setUser(userInfo)

          setIsLoggedIn(true)
        }
      })
      .catch((error) => {
        // const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        console.log(error)
        console.log('sign in error ', errorMessage)
      })
  const logOut = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        setIsLoggedIn(false)
      })
      .catch((error) => {
        console.log(error)
      })
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
      } else {
        signOut(auth)
      }
    })
  }, [isLoggedIn])
  useEffect(() => {
    // addDoc(usersRef, user)
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }, [user])
  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, logOut, signIn, user }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  return useContext(AppContext)
}
export { AppProvider }
