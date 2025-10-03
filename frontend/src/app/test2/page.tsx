// app/page.tsx
import React from 'react';

type ApiResponse = {
  message: string;
};

// サーバーコンポーネントなので async が使える
export default async function Home() {
    let message = '';

    try {
        const res = await fetch('http://nginx_proxy:80/api/test', {
            cache: 'no-store', // 毎回 SSR
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ApiResponse = await res.json();
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
