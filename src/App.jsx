import { useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";

const LOCAL_STORAGE_KEY = "todoApp.todos";
let ranOnce = false;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: false },
    { id: 3, title: "Todo 3", completed: false },
  ]);

  const todoNameRef = useRef();

  useEffect(() => {
    if (!ranOnce) {
      const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedTodos) setTodos(storedTodos);
      ranOnce = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === "") return;

    const newTodos = [
      ...todos,
      { id: Date.now(), title: name, completed: false },
    ];

    setTodos(newTodos);
    todoNameRef.current.value = null;
  };

  const handleClearTodos = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col [&>*]:m-1">
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input ref={todoNameRef} type="text" placeholder="Buy bread" />
        {/* [&>*] used to target the children */}
        <div className="flex flex-col [&>*]:my-1">
          <button onClick={handleAddTodo}>Add Todo</button>
          <button onClick={handleClearTodos}>Clear Completed Todos</button>
        </div>
      </div>
    </div>
  );
}

export default App;
