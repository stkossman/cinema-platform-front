import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { ordersService } from '../../../services/ordersService'
import { accountService } from '../../../services/accountService'
import type { OrderItem } from '../../../types/order'

export type TabType = 'active-tickets' | 'history' | 'settings'

export interface ProfileUpdateData {
  firstName: string
  lastName: string
  oldPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}

export const useProfile = () => {
  const { user, logout, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('active-tickets')

  const [tickets, setTickets] = useState<OrderItem[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(false)

  const [isSaving, setIsSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return
      setIsLoadingTickets(true)
      try {
        const data = await ordersService.getMyOrders()
        setTickets(data)
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        setIsLoadingTickets(false)
      }
    }

    if (activeTab === 'active-tickets' || activeTab === 'history') {
      fetchTickets()
    }
  }, [user, activeTab])

  const activeTickets = tickets.filter(t => t.status === 'active')

  const historyOrders = tickets.filter(
    t => t.status === 'completed' || t.status === 'cancelled',
  )

  const updateProfileData = async (data: ProfileUpdateData) => {
    setIsSaving(true)
    setSuccessMsg(null)
    setErrorMsg(null)

    try {
      const promises: Promise<void>[] = []
      const messages: string[] = []

      if (data.firstName !== user?.name || data.lastName !== user?.surname) {
        promises.push(
          accountService
            .updateProfile({
              firstName: data.firstName,
              lastName: data.lastName,
            })
            .then(() => {
              updateUser({ name: data.firstName, surname: data.lastName })
              messages.push('Профіль оновлено')
            }),
        )
      }

      if (data.newPassword) {
        promises.push(
          accountService
            .changePassword({
              oldPassword: data.oldPassword,
              newPassword: data.newPassword,
              confirmNewPassword: data.confirmNewPassword,
            })
            .then(() => {
              messages.push('Пароль змінено')
            }),
        )
      }

      if (promises.length === 0) {
        setIsSaving(false)
        return false
      }

      await Promise.all(promises)

      setSuccessMsg(messages.join(' та '))
      setIsSaving(false)
      return true
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.message || 'Помилка збереження даних')
      setIsSaving(false)
      return false
    }
  }

  const clearMessages = () => {
    setSuccessMsg(null)
    setErrorMsg(null)
  }

  return {
    user,
    logout,
    updateUser,
    activeTab,
    setActiveTab,
    activeTickets,
    historyOrders,
    isLoadingTickets,
    isSaving,
    successMsg,
    errorMsg,
    updateProfileData,
    clearMessages,
  }
}
