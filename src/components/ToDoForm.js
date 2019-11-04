import React, { useState, useContext, useEffect } from "react";
import ToDosContext from "../context";

export default function ToDoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentToDo = {} },
    dispatch
  } = useContext(ToDosContext);

  useEffect(() => {
    if (currentToDo.text) {
      setTodo(currentToDo.text);
    } else {
        setTodo("")
    }
  }, [currentToDo.id]);

  const handleSubmit = event => {
    event.preventDefault();
    if (currentToDo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    setTodo("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
