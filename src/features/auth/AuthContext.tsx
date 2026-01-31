import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { type User } from '../../types/auth'
import { authService } from '../../services/authService'
import { api } from '../../lib/axios'

interface LoginParams {
  email: string
  password: string
}
interface RegisterParams {
  email: string
  password: string
  firstName: string
  lastName: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (params: LoginParams) => Promise<void>
  register: (params: RegisterParams) => Promise<void>
  logout: () => void
  updateUserData: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async ({ email, password }: LoginParams) => {
    const user = await authService.login(email, password)
    setUser(user)
  }

  const register = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterParams) => {
    await authService.register(email, password, firstName, lastName)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    delete api.defaults.headers.common['Authorization']
  }

  const updateUserData = async (_data: Partial<User>) => {
    if (!user) return
    alert('Редагування профілю тимчасово недоступне.')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
