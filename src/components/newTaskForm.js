import React from 'react'
import { useTodoListContext } from '../contexts/todoListContext'

const NewTaskForm = React.memo(() => {
  const { task, handleChange, handleSubmit } = useTodoListContext()
  const { title, content } = task
  return (
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
            value={title}
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
            value={content}
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
  )
})
export default NewTaskForm
