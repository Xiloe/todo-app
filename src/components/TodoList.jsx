import React from "react";
import { Todo } from "./Todo";

export const TodoList = (props) => {
  const { todos, toggleTodo } = props;

  return todos.map((todo) => (
    <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
  ));
};
