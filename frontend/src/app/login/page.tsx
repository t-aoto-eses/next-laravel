// frontend/app/login/page.tsx
'use client'

import { useState } from 'react'
import { api } from '@/app/lib/axios'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await api.get('/api/sanctum/csrf-cookie') // CSRF Cookie取得
      await api.post('/login', { email, password })
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
      alert('ログイン失敗')
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  )
}
