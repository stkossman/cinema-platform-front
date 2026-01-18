export interface User {
  id: string
  email: string
  name: string
  surname: string
  role: 'user' | 'admin'
}

export interface AuthResponse {
  user: User
  token: string
}
