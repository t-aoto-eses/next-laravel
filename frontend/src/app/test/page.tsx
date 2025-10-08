'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/app/lib/apiClient';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    type ApiResponse = {
      message: string;
    };

    const fetchMessage = async () => {
      try {
        const data = await apiFetch<ApiResponse>('/api/test');
        setMessage(data.message);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('Unknown error', err);
        }
      }
    };

    fetchMessage(); // async関数を呼び出す
  }, []);

  return (
    <main>
      <h1>Next.js + Laravel API 接続確認 (CSR)</h1>
      <p>{message}</p>
    </main>
  );
}
