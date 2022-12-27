import { useAppContext } from '../contexts/appContext'
import '../styles/css/header.css'
const Header = () => {
  const { isLoggedIn, user, logOut, signIn } = useAppContext()

  const { displayName: userName } = user
  // console.log(user

  return (
    <div className='header'>
      <h1 className='app-header'>TODO LIST</h1>
      <section className='btns-section'>
        <button
          className='login-btn'
          onClick={signIn}
          disabled={isLoggedIn ? true : false}
        >
          {isLoggedIn && userName ? userName.split(' ')[0] : 'Login'}
        </button>
        <button
          className='login-btn'
          style={{
            display: `${isLoggedIn ? 'inline' : 'none'}`,
            marginLeft: '5px',
          }}
          onClick={logOut}
        >
          Logout
        </button>
      </section>
    </div>
  )
}
export default Header
