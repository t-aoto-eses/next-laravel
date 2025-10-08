// frontend/src/lib/apiFetch.ts
// import { apiFetch } from '@app/lib/apiClient';

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // SSR: NodeコンテナからNginxを経由してLaravel APIにアクセス
    return process.env.SSR_API_BASE_URL;
  }
  // CSR: ブラウザからNginx経由でLaravel APIにアクセス
  return process.env.NEXT_PUBLIC_API_BASE_URL;
};

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  console.log(path);
  const url = getBaseUrl() + path;
  console.log(url);
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
