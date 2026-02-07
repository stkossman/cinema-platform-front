import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useAuth } from '../../auth/AuthContext'
import { ordersService } from '../../../services/ordersService'
import { accountService } from '../../../services/accountService'
import { useToast } from '../../../common/components/Toast/ToastContext'

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
  const toast = useToast()

  const [activeTab, setActiveTab] = useState<TabType>('active-tickets')

  const { data: ticketsData, isLoading: isLoadingTickets } = useQuery({
    queryKey: ['my-orders'],
    queryFn: ordersService.getMyOrders,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    select: data => {
      return {
        active: data.filter(t => t.status === 'active'),
        history: data.filter(
          t => t.status === 'completed' || t.status === 'cancelled',
        ),
      }
    },
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      const promises: Promise<void>[] = []

      if (data.firstName !== user?.name || data.lastName !== user?.surname) {
        promises.push(
          accountService
            .updateProfile({
              firstName: data.firstName,
              lastName: data.lastName,
            })
            .then(() => {
              updateUser({ name: data.firstName, surname: data.lastName })
            }),
        )
      }

      if (data.newPassword) {
        promises.push(
          accountService.changePassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
            confirmNewPassword: data.confirmNewPassword,
          }),
        )
      }

      if (promises.length === 0) return

      await Promise.all(promises)
    },
    onSuccess: () => {
      toast.success('Дані успішно оновлено')
    },
    onError: (error: any) => {
      console.error(error)
      toast.error(
        error.response?.data?.detail ||
          error.message ||
          'Помилка збереження даних',
      )
    },
  })

  const updateProfileData = async (data: ProfileUpdateData) => {
    try {
      await updateProfileMutation.mutateAsync(data)
      return true
    } catch {
      return false
    }
  }

  return {
    user,
    logout,
    updateUser,
    activeTab,
    setActiveTab,

    activeTickets: ticketsData?.active || [],
    historyOrders: ticketsData?.history || [],
    isLoadingTickets,

    isSaving: updateProfileMutation.isPending,
    updateProfileData,
  }
}
