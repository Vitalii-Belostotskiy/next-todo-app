"use client";
import { useState } from "react";
import { Todo } from "@/app/types/todo";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";
import axios from "axios";

export const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const unicId =
    initialTodos.length > 0
      ? Math.max(...initialTodos.map((todo) => todo.id)) + 1
      : 1;
  const [nextId, setNextId] = useState(unicId);

  const handleAddTodo = async (title: string) => {
    const newTodo = {
      id: nextId,
      title,
      completed: false,
      userId: 1,
    };

    setTodos([...todos, newTodo]);
    setNextId(nextId + 1);

    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", {
        title,
        completed: false,
        userId: 1,
      });
    } catch {
      setTodos(todos);
      setNextId(nextId);
      alert("Todo can not be added");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const deletedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(deletedTodos);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <AddTodoForm onAdd={handleAddTodo} />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} onDelete={handleDeleteTodo} />
        ))}
      </ul>
    </div>
  );
};
