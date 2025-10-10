// frontend/src/app/todo/TodoToggleButton.tsx

"use client";

type Props = {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
};

export default function TodoToggleButton({ onClick, disabled, loading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-green-500 text-white px-2 h-8 rounded disabled:opacity-50"
    >
      {loading ? "..." : "切替"}
    </button>
  );
}
