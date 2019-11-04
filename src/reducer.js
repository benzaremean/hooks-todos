import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TODO":
      const toggledToDos = state.todos.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : t
      );
      return {
        ...state,
        todos: toggledToDos
      };
    case "UPDATE_TODO":
      const updatedToDo = { ...state.currentToDo, text: action.payload };
      const updatedToDoIndex = state.todos.findIndex(
        t => t.id === state.currentToDo.id
      );
      console.log(updatedToDoIndex);
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1)
      ];
      return {
        ...state,
        currentToDo: {},
        todos: updatedToDos
      };
    case "REMOVE_TODO":
      const filteredToDos = state.todos.filter(t => t.id !== action.payload.id);
      const isRemovedToDo =
        state.currentToDo.id === action.payload.id ? {} : state.currentToDo;
      console.log(isRemovedToDo);
      return {
        ...state,
        currentToDo: isRemovedToDo,
        todos: filteredToDos
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentToDo: action.payload
      };
    case "ADD_TODO":
      const newtodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };
      const addedTodos = [...state.todos, newtodo];
      return {
        ...state,
        todos: addedTodos
      };
    default:
      return state;
  }
}
