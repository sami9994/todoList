import '../styles/css/todoListBody.css'
import { tasksList } from '../data'
import TodoListItems from './TodoListItems'
const TodoList = () => {
  return (
    <div className='todo-list-body'>
      <section className='new-task-section'>
        <h4>Add New Task</h4>
        <form className='form-content'>
          <label htmlFor='task'>
            <input
              type='text'
              id='task'
              className='todo-list-input'
              placeholder='New Task'
            />
          </label>
          <button className='btn' onClick={() => console.log('add clicked')}>
            Add
          </button>
        </form>
      </section>
      <section>
        <TodoListItems items={tasksList} />
      </section>
    </div>
  )
}
export default TodoList
