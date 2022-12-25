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
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { useAppContext } from './appContext'
const TodoListContext = React.createContext()
const tasksCollectionRef = collection(db, 'tasks')
const TodoListProvider = ({ children }) => {
  const { user, isLoggedIn } = useAppContext()
  const [task, setTask] = useState({
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

    const docRef = doc(db, 'tasks', taskId)

    updateDoc(docRef, taskToEdit)
    setModal(false)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target

    setTask((prev) => ({ ...prev, [name]: value }))
  }
  const handleEditChange = ({ target }) => {
    const { name, value } = target

    setTaskToEdit((prev) => ({ ...prev, [name]: value }))
  }

  const checkBoxToggle = (id) => {
    const docRef = doc(db, 'tasks', id)
    onSnapshot(docRef, (snapShot) => {
      setTaskToEdit({ ...snapShot.data(), fireStoreId: snapShot.id })
    })
    console.log(taskToEdit)

    updateDoc(docRef, { done: !taskToEdit.done })
  }
  const deleteTask = (id) => {
    const docRef = doc(db, 'tasks', id)
    deleteDoc(docRef)
      .then(() => {
        console.log('task has been deleted')
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const editModal = async (id) => {
    setModal(true)

    setTaskId(id)
    const docRef = doc(db, 'tasks', id)
    onSnapshot(docRef, (snapShot) => {
      setTaskToEdit({ ...snapShot.data(), fireStoreId: snapShot.id })
    })
  }

  const getTasks = async () => {
    onSnapshot(tasksCollectionRef, (snapShot) => {
      let fireTasks = snapShot.docs.map((item) => {
        return {
          ...item.data(),
          fireStoreId: item.id,
        }
      })
      setTasks(fireTasks)
    })
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
