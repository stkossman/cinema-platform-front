import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminUsersService } from '../../../services/adminUsersService'
import { adminOrdersService } from '../../../services/adminOrdersService'
import { adminTicketsService } from '../../../services/adminTicketsService'

export const useUserActivity = () => {
  const queryClient = useQueryClient()
  const [selectedUserId, setSelectedUserId] = useState('')

  const usersQuery = useQuery({
    queryKey: ['admin-users-list-sidebar'],
    queryFn: () => adminUsersService.getAll(1, 100),
    staleTime: 5 * 60 * 1000,
  })

  const usersList = Array.isArray(usersQuery.data)
    ? usersQuery.data
    : usersQuery.data?.items || []

  const userDataQuery = useQuery({
    queryKey: ['admin-user-orders', selectedUserId],
    queryFn: () => adminOrdersService.getUserOrders(selectedUserId),
    enabled: !!selectedUserId,
    staleTime: 0,
    select: data => {
      const allTickets = data
        .flatMap(order =>
          order.tickets.map(ticket => ({
            ...ticket,
            orderId: order.id,
          })),
        )
        .sort(
          (a, b) =>
            new Date(b.sessionStart).getTime() -
            new Date(a.sessionStart).getTime(),
        )

      return {
        orders: data,
        tickets: allTickets,
      }
    },
  })

  const validateMutation = useMutation({
    mutationFn: adminTicketsService.validate,
    onSuccess: msg => {
      alert(msg)
      queryClient.invalidateQueries({
        queryKey: ['admin-user-orders', selectedUserId],
      })
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || 'Помилка валідації')
    },
  })

  const cancelMutation = useMutation({
    mutationFn: adminOrdersService.cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-user-orders', selectedUserId],
      })
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || 'Помилка скасування замовлення')
    },
  })

  const validateTicket = (ticketId: string) => {
    validateMutation.mutate(ticketId)
  }

  const cancelOrder = (orderId: string) => {
    if (
      !confirm(
        'Ви впевнені, що хочете скасувати це замовлення? Це також скасує всі квитки.',
      )
    )
      return
    cancelMutation.mutate(orderId)
  }

  const selectUser = (id: string) => {
    if (id === selectedUserId) return
    setSelectedUserId(id)
  }

  return {
    users: usersList,
    isLoadingUsers: usersQuery.isLoading,

    selectedUserId,
    selectUser,

    orders: userDataQuery.data?.orders || [],
    tickets: userDataQuery.data?.tickets || [],
    isLoadingData: userDataQuery.isFetching,

    validateTicket,
    cancelOrder,
  }
}
