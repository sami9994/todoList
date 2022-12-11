import '../styles/css/todo-list-item.css'
const TodoListItems = ({ task, checkBoxToggle }) => {
  return (
    <div className='item'>
      <section>
        <h3 className='task-title'>{task.title}</h3>
        <p className='task-content'>{task.content}</p>
      </section>
      <section className='input-btn'>
        <button className='content-btn'>Edit</button>
        <input
          type='checkbox'
          onChange={(id) => checkBoxToggle(task.id)}
          className='checkbox-input'
          checked={task.done}
        />
      </section>
    </div>
  )
}
export default TodoListItems
