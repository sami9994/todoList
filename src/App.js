import { useState } from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <TodoList isLoggedIn={isLoggedIn} />
    </>
  )
}

export default App
