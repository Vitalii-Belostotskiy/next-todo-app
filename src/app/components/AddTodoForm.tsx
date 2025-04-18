"use client";
import { FormEvent, useState } from "react";

export const AddTodoForm = ({
  onAdd,
}: {
  onAdd: (title: string) => Promise<void>;
}) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim) {
      return;
    }

    setIsloading(true);
    try {
      await onAdd(title);
      setTitle("");
    } catch (error) {
      alert(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <form className="mb-4 flex" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
      >
        {isLoading ? "Creating" : "Create"}
      </button>
    </form>
  );
};
