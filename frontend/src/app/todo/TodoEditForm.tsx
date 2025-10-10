// frontend/src/app/todo/TodoEditForm.tsx
"use client";

import { Todo, updateTodo } from "../lib/api";
import { toast } from "react-hot-toast";
import { useState } from "react";

type Props = {
  todo: Todo;
  onCancel: () => void;
  onUpdated: (updated: Todo) => void;
};

export default function TodoEditForm({ todo, onCancel, onUpdated }: Props) {
  const [title, setTitle] = useState(todo.title);
  const [body, setBody] = useState(todo.body || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const updated = await updateTodo({ ...todo, title, body });
      onUpdated(updated);
      toast.success("更新しました");
    } catch (err) {
      toast.error("更新に失敗しました");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 rounded"
        rows={2}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-2 py-1 rounded disabled:opacity-50"
          disabled={saving}
        >
          {saving ? "保存中..." : "保存"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-2 py-1 rounded"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
