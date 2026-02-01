import axios, { type AxiosError } from 'axios'
import { authService } from '../services/authService'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5211/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const getErrorMessage = (error: AxiosError<any>): string => {
  const data = error.response?.data

  if (!data) return error.message

  if (data.extensions?.errors) {
    if (Array.isArray(data.extensions.errors)) {
      return data.extensions.errors
        .map((e: any) => e.ErrorMessage || e.message)
        .join('\n')
    }
    return Object.values(data.extensions.errors).flat().join('\n')
  }

  if (data.detail) return data.detail
  if (data.title) return data.title

  return 'Сталася невідома помилка'
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (error.response?.status === 429 && !originalRequest._retry429) {
      originalRequest._retry429 = true
      console.warn('Rate limit hit. Retrying in 1s...')
      await wait(1000)
      return api(originalRequest)
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login')
    ) {
      originalRequest._retry = true

      try {
        const newToken = await authService.refreshToken()
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        authService.logout()
        return Promise.reject(refreshError)
      }
    }

    error.message = getErrorMessage(error)
    return Promise.reject(error)
  },
)
