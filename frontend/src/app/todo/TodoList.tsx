// frontend/src/app/todo/TodoList.tsx

"use client";

import { useState } from "react";
import { addTodo, updateTodo, deleteTodo, Todo } from "../lib/api";
import { toast } from "react-hot-toast";
import TodoAddForm from "./TodoAddForm";
import TodoEditForm from "./TodoEditForm";
import TodoFilterTabs from "./TodoFilterTabs";
import TodoToggleButton from "./TodoToggleButton";

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);

  {/* 追加 */}
  const handleAdd = async (title: string, body: string) => {
    setAdding(true);
    try {
      const newTodo = await addTodo(title, body);
      setTodos((prev) => [...prev, newTodo]);
      toast.success("追加しました");
    } catch (err) {
      toast.error("追加に失敗しました");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  {/* 完了切り替え */}
  const handleToggle = async (todo: Todo) => {
    if (loadingIds.includes(todo.id)) return;
    setLoadingIds((prev) => [...prev, todo.id]);
    try {
      const updated = await updateTodo({ ...todo, completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
      toast.success("ステータスを更新しました");
    } catch (err) {
      toast.error("更新に失敗しました");
      console.error(err);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== todo.id));
    }
  };

  {/* 削除 */}
  const handleDelete = async (id: number) => {
    if (loadingIds.includes(id)) return;
    setLoadingIds((prev) => [...prev, id]);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      toast.error("削除に失敗しました");
      console.error(err);
    } finally {
      setLoadingIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // タブに応じてフィルタリング
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 追加フォーム */}
      <TodoAddForm onAdd={handleAdd} adding={adding} />

      {/* タブ */}
      <TodoFilterTabs filter={filter} onChange={setFilter} />

      {/* Todo一覧 */}
      <ul>
        {filteredTodos.map((todo) => {
          const isLoading = loadingIds.includes(todo.id);
          return (
            <li
              key={todo.id}
              className="mb-2 border p-2 rounded flex justify-between items-start opacity-80"
            >
              {editingId === todo.id ? (
                <TodoEditForm
                  todo={todo}
                  onCancel={() => setEditingId(null)}
                  onUpdated={(updated) => {
                    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
                    setEditingId(null);
                  }}
                />
              ) : (
                // 通常表示
                <div className="flex justify-between w-full">
                  <div>
                    <h2 className="font-semibold">{todo.title}</h2>
                    {todo.body && <p className="text-gray-400 whitespace-pre-line">{todo.body}</p>}
                    <p className="text-gray-400">ステータス: {todo.completed ? "✅ 完了" : "❌ 未完了"}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <TodoToggleButton
                      onClick={() => handleToggle(todo)}
                      disabled={isLoading || editingId !== null}
                      loading={isLoading}
                    />
                    <button
                      onClick={() => {
                        setEditingId(todo.id);
                      }}
                      disabled={isLoading}
                      className="bg-orange-500 text-white px-2 h-8 rounded disabled:opacity-50"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      disabled={isLoading || editingId !== null}
                      className="bg-red-500 text-white px-2 h-8 rounded disabled:opacity-50"
                    >
                      {isLoading ? "..." : "削除"}
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
