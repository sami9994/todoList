import '../styles/css/todoListBody.css'
import tasksList from '../data'
import { v4 as uuidv4 } from 'uuid'
import TodoListItem from './TodoListItem'
import { useState } from 'react'
import Modal from './Modal'
const TodoList = ({ isLoggedIn }) => {
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
    console.log(id)
    setModal(true)
    const tempTask = tasks.filter((item) => item.id === id)

    setTaskToEdit(tempTask[0])
  }

  return (
    <>
      <Modal
        modal={modal}
        setModal={setModal}
        task={taskToEdit}
        handleEditChange={handleEditChange}
        handleSubmit={handleEditSubmit}
      />
      <section className='new-task-section'>
        <h6 className='body-title'>Add New Task</h6>
        <form className='form-content'>
          <section>
            <label htmlFor='taskTitle'>
              <input
                type='text'
                id='taskTitle'
                name='title'
                className='todo-list-input'
                placeholder='New Task Title'
                minLength='3'
                maxLength='20'
                value={task.title}
                required
                onChange={handleChange}
              />
            </label>
            <label htmlFor='task'>
              <input
                type='text'
                id='taskContent'
                name='content'
                minLength='3'
                maxLength='50'
                value={task.content}
                required
                className='todo-list-input'
                placeholder='New Task Content'
                onChange={handleChange}
              />
            </label>
          </section>
          <button className='btn' type='submit' onClick={handleSubmit}>
            Add
          </button>
        </form>
      </section>

      <div className='todo-list-body'>
        {tasks.length > 0 ? (
          <section className='todo-list-items'>
            {tasks.map((listItem) => {
              return (
                <TodoListItem
                  task={listItem}
                  key={listItem.id}
                  checkBoxToggle={checkBoxToggle}
                  deleteTask={deleteTask}
                  editModal={editModal}
                />
              )
            })}
          </section>
        ) : (
          <h1>There are nothing </h1>
        )}
      </div>
    </>
  )
}
export default TodoList
