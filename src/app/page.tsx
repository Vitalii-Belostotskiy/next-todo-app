
import { Suspense } from "react";
import { Todo } from "./types/todo";
import { TodoList } from "./components/TodoList";

async function getTodos(): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const data = await res.json();
  return data;
}

export default async function Home() {
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-black-100 py-8">
      <div className="container mx-auto p-4 max-w-md">
        <Suspense fallback={<div>Loading client components...</div>}>
          <TodoList initialTodos={ initialTodos } />
        </Suspense>
      </div>
    </main>
  );
}
