// frontend\src\app\register\page.tsx

'use client'

import { useState } from 'react'
import { api } from '@/app/lib/axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await api.get('/api/sanctum/csrf-cookie')
      await api.post('/register', { name, email, password, password_confirmation })
      router.push('/dashboard')
    } catch (e) {
      console.error(e)
      alert('登録失敗')
    }
  }

  return (
    <div>
      <h1>会員登録</h1>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <input placeholder="Confirm Password" type="password" value={password_confirmation} onChange={e=>setPasswordConfirmation(e.target.value)} />
      <button onClick={handleRegister}>登録</button>
    </div>
  )
}
