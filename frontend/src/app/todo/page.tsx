// frontend/src/app/todo/page.tsx

import React from "react";
import { fetchTodos, Todo } from "../lib/api";
import TodoList from "./TodoList"; // 👈 CSRコンポーネントを追加

export default async function TodosPage() {
  let todos: Todo[] = [];
  let errorMessage = "";

  try {
    todos = await fetchTodos(); // ✅ SSRで初期データ取得
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      errorMessage = "Todo一覧取得エラー";
    }
  }

  if (errorMessage) {
    return <p className="text-red-600 p-4">{errorMessage}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      {/* ✅ 初期データをCSRコンポーネントに渡す */}
      <TodoList initialTodos={todos} />
    </div>
  );
}
