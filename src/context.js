import React from 'react'

const TodosContext = React.createContext({
  todos: [],
  currentToDo: {},
})

export default TodosContext
