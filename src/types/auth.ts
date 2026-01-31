export interface User {
  id: string
  email: string
  name: string
  surname: string
  role: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
}
