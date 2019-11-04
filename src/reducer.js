
export default function reducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload,
      }
    case 'TOGGLE_TODO':
      const toggledToDos = state.todos.map(t =>
        t.id === action.payload.id ? action.payload : t
      )
      return {
        ...state,
        todos: toggledToDos,
      }
    case 'UPDATE_TODO':
      const updatedToDo = { ...action.payload }
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === state.currentToDo.id
      )
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ]
      return {
        ...state,
        currentToDo: {},
        todos: updatedToDos,
      }
    case 'REMOVE_TODO':
      const filteredToDos = state.todos.filter(t => t.id !== action.payload.id)
      const isRemovedToDo =
        state.currentToDo.id === action.payload.id ? {} : state.currentToDo
      console.log(isRemovedToDo)
      return {
        ...state,
        currentToDo: isRemovedToDo,
        todos: filteredToDos,
      }
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentToDo: action.payload,
      }
    case 'ADD_TODO':
      const addedTodos = [...state.todos, action.payload]
      return {
        ...state,
        todos: addedTodos,
      }
    default:
      return state
  }
}
