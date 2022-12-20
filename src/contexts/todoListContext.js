import React, { useState, useEffect, useContext } from 'react'
import tasksList from '../data'
import { v4 as uuidv4 } from 'uuid'
const TodoListContext = React.createContext()

const TodoListProvider = ({ children }) => {
  const [task, setTask] = useState({
    id: uuidv4(),
    title: '',
    content: '',
    done: false,
  })
  const [tasks, setTasks] = useState(tasksList)
  const [modal, setModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.content && task.title) {
      setTasks((prev) => [task, ...prev])
      setTask({ id: uuidv4(), title: '', content: '', done: false })
    } else window.alert('please provide all fields')
    return
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (taskToEdit.content && taskToEdit.title) {
      const newTasks = tasks.map((item) => {
        if (item.id === taskToEdit.id) {
          item.title = taskToEdit.title
          item.content = taskToEdit.content
        }
        return item
      })
      setTasks(newTasks)
      setTaskToEdit((prev) => ({ ...prev, title: '', content: '' }))
      setModal(false)
    } else window.alert('please provide all fields')
    return
  }

  const handleChange = ({ target }) => {
    const { name, value } = target

    setTask((prev) => ({ ...prev, [name]: value }))
  }
  const handleEditChange = ({ target }) => {
    const { name, value } = target

    setTaskToEdit((prev) => ({ ...prev, [name]: value }))
    console.log(taskToEdit)
  }

  const checkBoxToggle = (id) => {
    const newTasks = tasks.map((item) => {
      if (id === item.id) {
        item.done = !item.done
        return item
      }
      return item
    })
    setTasks(newTasks)
  }
  const deleteTask = (id) => {
    const newTasks = tasks.filter((item) => id !== item.id)
    setTasks(newTasks)
  }
  const editModal = (id) => {
    setModal(true)
    const tempTask = tasks.filter((item) => item.id === id)

    setTaskToEdit(tempTask[0])
  }
  return (
    <TodoListContext.Provider
      value={{
        handleChange,
        checkBoxToggle,
        deleteTask,
        editModal,
        handleEditChange,
        handleEditSubmit,
        handleSubmit,
        setModal,
        tasks,
        task,
        taskToEdit,
        modal,
      }}
    >
      {children}
    </TodoListContext.Provider>
  )
}

export const useTodoListContext = () => {
  return useContext(TodoListContext)
}
export { TodoListProvider, TodoListContext }
