import { useState } from "react";
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
  const deleteTodo = (id: string) => {
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };
  console.log(todos);
  return (
    <div className="bg-blue-gray-500 flex flex-col items-center w-full h-full  ">
      <div className="bg-deep-purple-600 flex flex-col rounded-2xl m-10 w-180 ">
        <h1 className="text-3xl font-bold underline pt-6 text-center">
          To Do list
        </h1>

        <div className=" flex gap-4 p-6 py-4 ps-5 ">
          <input
            className="min-w-[520px]  bg-transparent border-amber-300 placeholder:text-gray-500  text-lg border rounded-md px-2 transition duration-300 ease focus:outline-hidden focus:border-b-gray-500 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="New Todo..."
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            className="rounded-xl bg-blue-500 sm px-6 py-2 border-2 border-gray-200"
            onClick={addTodo}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Todo
          </Button>
        </div>
        <div className="flex w-full   ">
          <ul className="flex-1 pb-2 ">
            {todos.map((todo) => (
              <li
                className="flex items-center  border-4 rounded-2xl m-2"
                key={todo.id}
              >
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
                  className={`peer-checked:line-through text-2xl text-blue-gray-50  ${
                    todo.checked ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </span>
                <TrashIcon
                  className="size-6 text-red-500 ml-auto mr-4"
                  onClick={() => deleteTodo(todo.id)}
                />
                {/* <Button
                  className="rounded-xl bg-blue-gray-700 sm px-6 py-2 border-4 border-amber-300"
                  onClick={() => deleteTodo(todo.id)}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Remove
                </Button> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
