// frontend/src/app/lib/api.ts
import { apiFetch } from '@/app/lib/apiClient'; // パスはプロジェクトに合わせて調整

export type Todo = {
  id: number;
  title: string;
  body?: string;
  completed: boolean;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  return apiFetch<Todo[]>('/api/todos');
};

export const addTodo = async (title: string, body?: string): Promise<Todo> => {
  return apiFetch<Todo>('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, completed: false }),
  });
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  return apiFetch<Todo>(`/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (id: number): Promise<void> => {
  await apiFetch<void>(`/api/todos/${id}`, {
    method: 'DELETE',
    credentials: 'include', // 必要なら
  });
};
