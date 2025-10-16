// frontend/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { api } from '@/app/lib/axios'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    api.get('/user').then(res => setUser(res.data)).catch(()=>setUser(null))
  }, [])

  if (!user) return <div>読み込み中...</div>

  return (
    <div>
      <h1>ダッシュボード</h1>
      <p>ようこそ {user.name} さん</p>
    </div>
  )
}
