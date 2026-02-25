import {useState} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

const SimpleTodos = () => {
  const [todos, setTodos] = useState(initialTodosList)
  const [inputValue, setInputValue] = useState('')

  const handleDelete = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const handleAdd = () => {
    if (inputValue === '') return

    const words = inputValue.split(' ')
    const lastWord = words[words.length - 1]

    // If last word is number → add multiple todos
    if (!Number.isNaN(Number(lastWord))) {
      const count = parseInt(lastWord)
      const title = words.slice(0, -1).join(' ')

      const newTodos = Array.from({length: count}).map((_, index) => ({
        id: Date.now() + index,
        title,
      }))

      setTodos([...todos, ...newTodos])
    } else {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
      }

      setTodos([...todos, newTodo])
    }

    setInputValue('')
  }

  const handleUpdate = (id, updatedTitle) => {
    const updatedList = todos.map(todo =>
      todo.id === id ? {...todo, title: updatedTitle} : todo,
    )
    setTodos(updatedList)
  }

  return (
    <div className="app-container">
      <h1 className="heading">Simple Todos</h1>

      {/* INPUT + ADD BUTTON */}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul className="todos-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </div>
  )
}

export default SimpleTodos
