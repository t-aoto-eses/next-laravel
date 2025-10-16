// frontend/lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost', // LaravelのURL
  withCredentials: true,            // Cookieを送信
})
