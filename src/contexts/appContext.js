import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { auth } from '../firebaseConfig'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const provider = new GoogleAuthProvider()
  const signIn = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        console.log(user)
        if (user.displayName) {
          setUserName(user.displayName)
          setIsLoggedIn(true)
          setUserId(user.uid)
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.

        console.log(errorMessage)
      })
  const signout = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        setIsLoggedIn(false)
      })
      .catch((error) => {
        console.log(error)
      })
  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, signout, signIn, userName, userId }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useAppContext = () => {
  return useContext(AppContext)
}
export { AppProvider }
