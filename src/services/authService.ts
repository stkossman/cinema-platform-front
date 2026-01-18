import type { User, AuthResponse } from '../types/auth'

const STORAGE_KEY = 'cinema_user'

export const authService = {
  login: async (email: string): Promise<AuthResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          email,
          name: 'Андрій',
          surname: 'Коссман',
          role: email.includes('admin') ? 'admin' : 'user',
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))

        resolve({
          user: mockUser,
          token: 'mock_jwt_token_12345',
        })
      }, 800)
    })
  },

  register: async (
    email: string,
    name: string,
    surname: string,
  ): Promise<AuthResponse> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          surname,
          role: 'user',
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))

        resolve({
          user: newUser,
          token: 'mock_jwt_token_new_user',
        })
      }, 800)
    })
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
  },
}
