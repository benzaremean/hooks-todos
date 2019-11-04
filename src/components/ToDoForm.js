import React, { useState, useContext, useEffect } from 'react'
import ToDosContext from '../context'
import axios from 'axios'
import uuidv4 from 'uuid/v4'

export default function ToDoForm() {
  const [todo, setTodo] = useState('')
  const {
    state: { currentToDo = {} },
    dispatch,
  } = useContext(ToDosContext)

  useEffect(() => {
    if (currentToDo.text) {
      setTodo(currentToDo.text)
    } else {
      setTodo('')
    }
  }, [currentToDo.id])

  const handleSubmit = async event => {
    event.preventDefault()
    if (currentToDo.text) {
      const response = await axios.patch(
        `https://hooks-api.benzaremean.now.sh/todos/${currentToDo.id}`,
        {
          text: todo,
        }
      )
      dispatch({ type: 'UPDATE_TODO', payload: response.data })
    } else {
      const response = await axios.post(
        `https://hooks-api.benzaremean.now.sh/todos`,
        {
          id: uuidv4(),
          text: todo,
          complete: false,
        }
      )
      dispatch({ type: 'ADD_TODO', payload: response.data })
    }
    setTodo('')
  }
  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  )
}
