import React, { useState, useContext, useEffect } from 'react'

import { db } from '../firebaseConfig'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { useAppContext } from './appContext'
const TodoListContext = React.createContext()
const TodoListProvider = ({ children }) => {
  const { user, isLoggedIn } = useAppContext()
  const tasksCollectionRef = collection(db, `users/${user.uid}/tasks`)
  const [task, setTask] = useState({
    title: '',
    content: '',
    done: false,
  })
  const [tasks, setTasks] = useState([])
  // const [taskDone, setTaskDone] = useState(false)
  const [modal, setModal] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState({})
  const [taskId, setTaskId] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (task.content && task.title) {
      addDoc(tasksCollectionRef, { ...task, uid: user.uid })
        .then((res) => console.log('successfully added '))
        .catch((e) => console.log('error', e))

      setTask({ title: '', content: '', done: false })
    } else window.alert('please provide all fields')
    return
  }
  const handleEditSubmit = (e) => {
    e.preventDefault()

    const docRef = doc(db, `users/${user.uid}/tasks`, taskId)
    if (taskToEdit.title && taskToEdit.content) {
      updateDoc(docRef, taskToEdit)
      setModal(false)
    }
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
    const docRef = doc(db, `users/${user.uid}/tasks`, id)
    onSnapshot(docRef, (snapShot) => {
      setTaskToEdit({ ...snapShot.data(), fireStoreId: snapShot.id })
    })
    console.log(taskToEdit)

    updateDoc(docRef, { done: !taskToEdit.done })
  }
  const deleteTask = (id) => {
    const docRef = doc(db, `users/${user.uid}/tasks`, id)
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
    console.log(id)
    setTaskId(id)
    const docRef = doc(tasksCollectionRef, id)
    onSnapshot(docRef, (snapShot) => {
      setTaskToEdit({ ...snapShot.data(), fireStoreId: id })
    })
  }

  const getTasks = async () => {
    const ref = collection(db, `users/${user.uid}/tasks`)
    onSnapshot(ref, (snapShot) => {
      let fireTasks = snapShot.docs.map((item) => {
        // console.log(item.data(), doc.id)
        return {
          ...item.data(),
          fireStoreId: item.id,
        }
      })
      console.log(fireTasks)
      setTasks(fireTasks)
    })
  }
  useEffect(() => {
    if (isLoggedIn) {
      getTasks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     console.log(isLoggedIn)
  //     getTasks()
  //     console.log(tasks)
  //   }
  // }, [taskDone])

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
