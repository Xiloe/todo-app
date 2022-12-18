import React from "react";

export const Todo = (props) => {
  const { todo, toggleTodo } = props;

  const handleCheckboxChange = () => {
    toggleTodo(todo.id);
  };

  return (
    <label className="text-white">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      {todo.title}
    </label>
  );
};
