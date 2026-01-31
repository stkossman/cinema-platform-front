import { useState, useEffect, useCallback } from 'react'
import {
  adminUsersService,
  type UserDto,
} from '../../../services/adminUsersService'

export const useUsers = () => {
  const [users, setUsers] = useState<UserDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminUsersService.getAll()
      setUsers(data)
    } catch (error) {
      console.error('Failed to fetch users', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const changeUserRole = async (userId: string, newRole: 'Admin' | 'User') => {
    try {
      await adminUsersService.changeRole(userId, newRole)
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)),
      )
      return { success: true }
    } catch (error: any) {
      const msg = error.response?.data || 'Помилка зміни ролі'
      return { success: false, error: msg }
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return { users, isLoading, fetchUsers, changeUserRole }
}
