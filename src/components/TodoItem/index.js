import {useState} from 'react'
import './index.css'

const TodoItem = ({todo, onDelete, onUpdate}) => {
  const {id, title} = todo

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(title)

  const handleEditClick = () => {
    if (isEditing) {
      onUpdate(id, editText)
    }
    setIsEditing(!isEditing)
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />
      ) : (
        <p className="todo-title">{title}</p>
      )}

      <div>
        <button type="button" onClick={handleEditClick}>
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
