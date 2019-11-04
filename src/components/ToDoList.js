import React, { useContext } from 'react'

import ToDosContext from '../context'
import axios from 'axios'

export default function ToDoList() {
  const { state, dispatch } = useContext(ToDosContext)
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing To Do!'
  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-4xl	 text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center bg-orange-600 border-black border-dashed border-2 my-2 py-4"
          >
            <span
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                'line-through text-gray-800'}`}
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `https://hooks-api.benzaremean.now.sh/todos/${todo.id}`,
                  {
                    complete: !todo.complete,
                  }
                )
                dispatch({ type: 'TOGGLE_TODO', payload: response.data })
              }}
            >
              {todo.text}
            </span>
            <button>
              <img
                className="h-6"
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                onClick={() =>
                  dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
                }
              />
            </button>
            <button
              onClick={async () => {
                await axios.delete(
                  `https://hooks-api.benzaremean.now.sh/todos/${todo.id}`
                )
                dispatch({ type: 'REMOVE_TODO', payload: todo })
              }}
            >
              <img
                className="h-6"
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
