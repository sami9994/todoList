import '../styles/css/modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { useTodoListContext } from '../contexts/todoListContext'
import React from 'react'

const Modal = () => {
  const { modal, setModal, taskToEdit, handleEditChange, handleEditSubmit } =
    useTodoListContext()

  return (
    <div className='modal' style={{ display: `${modal ? 'block' : 'none'}` }}>
      <FontAwesomeIcon
        icon={faTimesCircle}
        className='close'
        onClick={() => setModal(false)}
      />
      <section className='modal-content'>
        <h6 className='edit-title'>Edit Task Form</h6>
        <form className='edit-form-content'>
          <section className='inputs'>
            <label htmlFor='taskTitle'>
              <input
                type='text'
                id='taskTitle'
                name='title'
                className='edit-input'
                placeholder='Edit Task Title'
                minLength='3'
                maxLength='20'
                value={taskToEdit.title || ''}
                required
                onChange={(e) => handleEditChange(e, taskToEdit)}
              />
            </label>
            <label htmlFor='task'>
              <input
                type='text'
                id='taskContent'
                name='content'
                minLength='3'
                maxLength='50'
                required
                className='edit-input'
                placeholder='Edit Task Content'
                value={taskToEdit.content || ''}
                onChange={(e) => handleEditChange(e, taskToEdit)}
              />
            </label>
          </section>
          <button className='edit-btn' type='submit' onClick={handleEditSubmit}>
            Edit
          </button>
        </form>
      </section>
    </div>
  )
}
export default React.memo(Modal)
