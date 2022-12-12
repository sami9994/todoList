import '../styles/css/todo-list-item.css'
const TodoListItems = ({ task, checkBoxToggle, deleteTask }) => {
  return (
    <div className='item'>
      <section>
        <h3 className='task-title'>{task.title}</h3>
        <p
          className='task-content'
          style={{ textDecoration: `${task.done ? 'line-through' : 'none'}` }}
        >
          {task.content}
        </p>
      </section>
      <section className='input-btns'>
        <section className='section-btn'>
          <button className='content-btn'>Edit</button>
          <button className='delete-btn' onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </section>
        <input
          type='checkbox'
          onChange={() => checkBoxToggle(task.id)}
          className='checkbox-input'
          checked={task.done}
        />
      </section>
    </div>
  )
}
export default TodoListItems
