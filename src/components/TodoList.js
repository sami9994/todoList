import '../styles/css/todoListBody.css'

import TodoListItem from './TodoListItem'

import Modal from './Modal'
import { useTodoListContext } from '../contexts/todoListContext'
import { useAppContext } from '../contexts/appContext'
import NewTaskForm from './newTaskForm'
const TodoList = () => {
  const { tasks, editModal, checkBoxToggle, deleteTask } = useTodoListContext()
  const { isLoggedIn } = useAppContext()

  if (!isLoggedIn) {
    return <h1>please login</h1>
  }
  return (
    <>
      <Modal />
      <section className='new-task-section'>
        <h6 className='body-title'>Add New Task</h6>
        <NewTaskForm />
      </section>

      <div className='todo-list-body'>
        {tasks.length > 0 ? (
          <section className='todo-list-items'>
            {tasks.map((listItem) => {
              return (
                <TodoListItem
                  key={listItem.id}
                  task={listItem}
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
