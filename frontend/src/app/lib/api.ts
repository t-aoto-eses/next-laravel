// frontend\src\app\lib\api.ts

export type Todo = {
  id: number;
  title: string;
  body?: string;
  completed: boolean;
};

// 簡単にサーバー／クライアントで切り替え
const BASE_URL =
  typeof window === 'undefined'
    ? 'http://nginx_proxy:80/api' // SSR用
    : 'http://localhost/api';      // クライアント用

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

export const addTodo = async (title: string, body?: string): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, completed: false }),
  });
  return res.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return res.json();
};

export const deleteTodo = async (id: number) => {
  await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' });
};
