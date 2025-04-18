"use client";
import { useState } from "react";
import { Todo } from "../types/todo";

export const TodoItem = ({
  todo,
  onDelete,
}: {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <li className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded shadow-sm">
      <span
        className={`transition-all ${
          todo.completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {todo.title}
      </span>
      <button
        className="text-red-500 hover:text-red-700 focus:outline-none disabled:text-red-300"
        aria-label="Delete todo"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        {isDeleting ? "Deleting" : "Delete"}
      </button>
    </li>
  );
};
