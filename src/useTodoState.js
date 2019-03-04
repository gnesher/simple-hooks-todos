import { useState } from "react";

export default initialValue => {
  const [todos, setTodos] = useState(initialValue);

  return {
    todos,
    addTodo: todoText => {
      setTodos([...todos, { text: todoText, completed: false }]);
    },
    deleteTodo: todoIndex => {
      const newTodos = todos.filter((_, index) => index !== todoIndex);
      setTodos(newTodos);
    },
    updateTodo: todoIndex => {
      setTodos(todos.map((todo, index) => {
        if (index === todoIndex) {
          todo.completed = !todo.completed;
        }
        return todo;
      }))
    }
  };
};
