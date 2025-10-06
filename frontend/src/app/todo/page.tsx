// frontend/src/app/todo/page.tsx

import React from 'react';
import { fetchTodos, Todo } from '../lib/api';

export default async function TodosPage() {
  let todos: Todo[] = [];
  let errorMessage = '';

  try {
    todos = await fetchTodos();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      errorMessage = 'Todo一覧取得エラー';
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Todo List (SSR)</h1>

      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="mb-2 border p-2 rounded">
              <h2 className="font-semibold">{todo.title}</h2>
              {todo.body && <p className="text-gray-600">{todo.body}</p>}
              <p>ステータス: {todo.completed ? '✅' : '❌'}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
