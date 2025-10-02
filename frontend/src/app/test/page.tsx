'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => {
        console.error('API Error:', err);
        setMessage('エラーが発生しました');
      });
  }, []);

  return (
    <main>
      <h1>Next.js + Laravel API 接続確認</h1>
      <p>{message}</p>
    </main>
  );
}
