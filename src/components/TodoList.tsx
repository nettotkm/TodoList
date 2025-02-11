import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { v4 as uuidv4 } from "uuid";
interface TodoItem {
  id: string;
  description: string;
  checked: boolean;
}
function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    const newTodoItem: TodoItem = {
      id: uuidv4(),
      description: newTodo,
      checked: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const handlechange = (id: string) => {
    setTodos(
      todos.map((item) => {
        if (item.id != id) {
          return item;
        } else {
          return { ...item, checked: !item.checked };
        }
      })
    );
  };
  console.log(todos);
  return (
    <div className="bg-blue-gray-500 flex flex-col items-center ">
      <h1 className="text-3xl font-bold underline">To Do list</h1>

      <div className="w-full max-w-sm min-w-[200px] flex items-center gap-2">
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="New Todo..."
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button
          className="rounded-full color=blue sm"
          onClick={addTodo}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Add Todo
        </Button>
      </div>
      <div className="">
        <ul className="flex flex-col">
          {todos.map((todo) => (
            <li key={todo.id}>
              {" "}
              <Checkbox
                className="peer rounded-full"
                color="blue"
                crossOrigin={undefined}
                onChange={() => handlechange(todo.id)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <span
                className={`peer-checked:line-through text-red-200 ${
                  todo.checked ? "line-through" : ""
                }`}
              >
                {todo.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
