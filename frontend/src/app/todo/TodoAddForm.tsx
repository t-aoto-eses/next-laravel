// frontend/src/app/todo/TodoAddForm.tsx

"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string, body: string) => Promise<void>;
  adding: boolean;
};

export default function TodoAddForm({ onAdd, adding }: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  {/* 追加 */}
  const handleAdd = async () => {
    if (!newTitle.trim() || adding) return;
    await onAdd(newTitle, newBody);
    setNewTitle("");
    setNewBody("");
  };

  return (
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
  );
}
