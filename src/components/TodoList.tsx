import { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon } from "@heroicons/react/24/solid";

interface TodoItem {
  id: string;
  description: string;
  checked: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  });
  const [newTodo, setNewTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem: TodoItem = {
        id: uuidv4(),
        description: newTodo.trim(),
        checked: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      inputRef.current?.focus();
    }
  };

  const handlechange = (id: string) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-blue-gray-500 flex flex-col items-center min-h-screen p-4">
      <div className="bg-deep-purple-600 rounded-2xl m-10 w-full max-w-2xl">
        <h1 className="text-3xl font-bold underline pt-6 text-center">
          To Do list
        </h1>

        <form onSubmit={addTodo} className="flex gap-4 p-6 py-4 ps-5">
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-amber-300 placeholder:text-gray-500 text-lg border rounded-md px-2 transition duration-300 ease focus:outline-none hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="New Todo..."
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            type="submit"
            className="rounded-xl bg-amber-900 px-6 py-2 border-2 border-gray-200"
            onClick={addTodo}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Todo
          </Button>
        </form>

        <div className="w-full p-4">
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                className="flex items-center min-h-[60px] border-4 rounded-2xl m-2 p-2 bg-white"
                key={todo.id}
              >
                <Checkbox
                  className="peer rounded-full"
                  color="green"
                  checked={todo.checked}
                  crossOrigin={undefined}
                  onChange={() => handlechange(todo.id)}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <span
                  className={`ml-2 text-xl ${
                    todo.checked
                      ? "line-through text-gray-500"
                      : "text-amber-900"
                  }`}
                >
                  {todo.description}
                </span>
                <TrashIcon
                  className="size-6 text-red-500 ml-auto mr-4 cursor-pointer"
                  onClick={() => deleteTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
