// app/page.tsx
import React from 'react';
import { apiFetch } from '@/app/lib/apiClient';

type ApiResponse = {
  message: string;
};

// サーバーコンポーネントなので async が使える
export default async function Home() {
    let message = '';

    try {
        const data: ApiResponse = await apiFetch('/api/test2', {
            cache: 'no-store', // SSR では毎回取得
        });
        message = data.message;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            message = 'API取得エラー';
        }
    }

    return (
        <main>
            <h1>Next.js + Laravel API 接続確認（SSR）</h1>
            <p>{message}</p>
        </main>
    );
}
