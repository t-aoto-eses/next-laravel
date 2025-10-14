// frontend/src/app/todo/TodoFilterTabs.tsx

"use client";

type Props = {
  filter: "all" | "active" | "completed";
  onChange: (filter: "all" | "active" | "completed") => void;
};

export default function TodoFilterTabs({ filter, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onChange("all")}
        className={`px-4 py-2 rounded text-black ${filter === "all" ? "bg-blue-300" : "bg-gray-200"}`}
      >
        全件
      </button>
      <button
        onClick={() => onChange("active")}
        className={`px-4 py-2 rounded text-black ${filter === "active" ? "bg-blue-300" : "bg-gray-200"}`}
      >
        未完了
      </button>
      <button
        onClick={() => onChange("completed")}
        className={`px-4 py-2 rounded text-black ${filter === "completed" ? "bg-blue-300" : "bg-gray-200"}`}
      >
        完了
      </button>
    </div>
  );
}
