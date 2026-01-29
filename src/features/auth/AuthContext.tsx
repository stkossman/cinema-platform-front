import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { type User } from '../../types/auth'
import { authService } from '../../services/authService'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string) => Promise<void>
  register: (email: string, name: string, surname: string) => Promise<void>
  logout: () => void
  updateUserData: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: 'd0e9c8b7-a6f5-4e4d-3c2b-1a0b9c8d7e6f',
    name: 'Andrii',
    surname: 'Kossman',
    email: 'admin@gmail.com',
    role: 'admin',
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string) => {
    const response = await authService.login(email)
    setUser(response.user)
  }

  const register = async (email: string, name: string, surname: string) => {
    const response = await authService.register(email, name, surname)
    setUser(response.user)
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const updateUserData = async (data: Partial<User>) => {
    if (!user) return
    const updatedUser = await authService.updateProfile(user.id, data)
    setUser(updatedUser)
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
