import { useState } from "react";
interface TodoItem {
  text: string;
}
function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    const newTodoItem: TodoItem = {
      text: newTodo,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };
  return (
    <>
      <h1>To Do list</h1>
      <div className="card">
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => (
            <li>
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
