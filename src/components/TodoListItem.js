import React from 'react'
import '../styles/css/todo-list-item.css'
const TodoListItems = ({ task, checkBoxToggle, deleteTask, editModal }) => {
  return (
    <div className='item'>
      <section className='title-content-section'>
        <h3 className='task-title'>{task.title || ''}</h3>
        <p
          className='task-content'
          style={{
            textDecoration: `${task.done ? 'line-through' : 'none'}`,
          }}
        >
          {task.content || ''}
        </p>
      </section>
      <section className='input-btns'>
        <section className='section-btn'>
          <button
            className='content-btn'
            onClick={() => editModal(task.fireStoreId)}
          >
            Edit
          </button>
          <button
            className='delete-btn'
            onClick={() => deleteTask(task.fireStoreId)}
          >
            Delete
          </button>
        </section>
        <input
          type='checkbox'
          onChange={() => checkBoxToggle(task.fireStoreId)}
          className='checkbox-input'
          checked={task.done}
        />
      </section>
    </div>
  )
}
export default React.memo(TodoListItems)
