// frontend/src/app/todo/TodoList.tsx

"use client";

import { useState } from "react";
import { addTodo, updateTodo, deleteTodo, Todo } from "../lib/api";

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [adding, setAdding] = useState(false);

  // ✅ 追加
  const handleAdd = async () => {
    if (!newTitle.trim() || adding) return;
    setAdding(true);
    try {
      const newTodo = await addTodo(newTitle, newBody); // ← bodyを渡す
      setTodos((prev) => [...prev, newTodo]);
      setNewTitle("");
      setNewBody("");
    } catch (err) {
      alert("追加に失敗しました");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  // ✅ 完了切り替え
  const handleToggle = async (todo: Todo) => {
    if (loadingIds.includes(todo.id)) return;
    setLoadingIds((prev) => [...prev, todo.id]);
    try {
      const updated = await updateTodo({ ...todo, completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      alert("更新に失敗しました");
      console.error(err);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== todo.id));
    }
  };

  // ✅ 削除
  const handleDelete = async (id: number) => {
    if (loadingIds.includes(id)) return;
    setLoadingIds((prev) => [...prev, id]);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("削除に失敗しました");
      console.error(err);
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 追加フォーム */}
      <div className="flex flex-col gap-2 mb-4 border p-3 rounded">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="タイトル"
          className="border p-2 rounded"
          disabled={adding}
        />
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="内容（任意）"
          className="border p-2 rounded"
          rows={2}
          disabled={adding}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={adding}
        >
          {adding ? "追加中..." : "追加"}
        </button>
      </div>

      {/* Todo一覧 */}
      <ul>
        {todos.map((todo) => {
          const isLoading = loadingIds.includes(todo.id);
          return (
            <li
              key={todo.id}
              className="mb-2 border p-2 rounded flex justify-between items-center opacity-80"
            >
              <div>
                <h2 className="font-semibold">{todo.title}</h2>
                {todo.body && <p className="text-gray-400 whitespace-pre-line">{todo.body}</p>}
                <p  className="text-gray-400">ステータス: {todo.completed ? "✅ 完了" : "❌ 未完了"}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(todo)}
                  disabled={isLoading}
                  className="bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
                >
                  {isLoading ? "..." : "切替"}
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  disabled={isLoading}
                  className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                >
                  {isLoading ? "..." : "削除"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
