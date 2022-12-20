import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AppProvider } from './contexts/appContext'
import { TodoListProvider } from './contexts/todoListContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AppProvider>
    <TodoListProvider>
      <App />
    </TodoListProvider>
  </AppProvider>
)
