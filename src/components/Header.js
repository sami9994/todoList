import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth, app } from '../firebaseConfig'
import '../styles/css/header.css'
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { useState } from 'react'
const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userName, setUserName] = useState('')
  const provider = new GoogleAuthProvider()
  const login = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        if (user.displayName) {
          setUserName(user.displayName)
          setIsLoggedIn(true)
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
        // An error happened.
      })
  return (
    <div className='header'>
      <h1 className='app-header'>TODO LIST</h1>
      <section>
        <button className='login-btn' onClick={login}>
          {isLoggedIn && userName ? userName.split(' ')[0] : 'Login'}
        </button>
        <button
          className='login-btn'
          style={{
            display: `${isLoggedIn ? 'block' : 'none'}`,
            marginLeft: '5px',
          }}
          onClick={signout}
        >
          Logout
        </button>
      </section>
    </div>
  )
}
export default Header
