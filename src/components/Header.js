import { useAppContext } from '../contexts/appContext'
import '../styles/css/header.css'
const Header = () => {
  const { isLoggedIn, userName, signout, signIn } = useAppContext()

  return (
    <div className='header'>
      <h1 className='app-header'>TODO LIST</h1>
      <section>
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
