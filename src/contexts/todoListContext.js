import React, { useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../firebaseConfig'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
} from 'firebase/firestore'
import { useAppContext } from './appContext'
import { async } from '@firebase/util'
const TodoListContext = React.createContext()
const tasksCollectionRef = collection(db, 'tasks')
const TodoListProvider = ({ children }) => {
  const { user, isLoggedIn } = useAppContext()
  const [task, setTask] = useState({
    id: uuidv4(),
    title: '',
    content: '',
    done: false,
  })
  const [tasks, setTasks] = useState([])
  const [taskDone, setTaskDone] = useState(false)
  const [modal, setModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState('')
  const [taskId, setTaskId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(task)
    if (task.content && task.title) {
      addDoc(tasksCollectionRef, task)
        .then((res) => console.log('successfully added ', res))
        .catch((e) => console.log('error', e))

      setTask({ title: '', content: '', done: false })
    } else window.alert('please provide all fields')
    return
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const { name, value } = e.target
    const docRef = doc(db, 'tasks', taskId)
    console.log('before', taskToEdit)
    setTaskToEdit((prev) => ({
      ...prev,
      [name]: value,
    }))
    console.log('after', taskToEdit)
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
  const editModal = async (id) => {
    setModal(true)
    // console.log(id)

    setTaskId(id)
    const t = query(tasksCollectionRef, where('id', '==', id)) // const tempTask = tasks.filter((item) => item.id === id)
    const querySnapshot = await getDocs(t)
    const arr = querySnapshot.docs.map((item) => item.data())
    setTaskToEdit(arr[0])
    // setTaskToEdit(tempTask[0])
    // console.log(taskToEdit)
  }

  const getTasks = async () => {
    const docs = await getDocs(tasksCollectionRef)
    let newTasks = docs.docs.map((item) => item.data())
    setTasks([...newTasks])
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      getTasks()
    }
  }, [isLoggedIn])
  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      getTasks()
    }
  }, [taskDone])

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
        // getTasks,
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
