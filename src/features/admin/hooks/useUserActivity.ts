import { useState, useEffect } from 'react'
import {
  adminOrdersService,
  type AdminOrderDto,
  type AdminTicketDto,
} from '../../../services/adminOrdersService'
import { adminTicketsService } from '../../../services/adminTicketsService'
import {
  adminUsersService,
  type UserDto,
} from '../../../services/adminUsersService'

export const useUserActivity = () => {
  const [users, setUsers] = useState<UserDto[]>([])
  const [selectedUserId, setSelectedUserId] = useState('')

  const [orders, setOrders] = useState<AdminOrderDto[]>([])
  const [tickets, setTickets] = useState<AdminTicketDto[]>([])

  const [isLoadingUsers, setIsLoadingUsers] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoadingUsers(true)
      try {
        const data = await adminUsersService.getAll()
        setUsers(data)
      } catch (e) {
        console.error('Failed to load users:', e)
        setError('Не вдалося завантажити список користувачів')
      } finally {
        setIsLoadingUsers(false)
      }
    }
    loadUsers()
  }, [])

  const fetchUserData = async (targetUserId: string) => {
    if (!targetUserId) return
    setIsLoadingData(true)
    setError(null)

    try {
      const data = await adminOrdersService.getUserOrders(targetUserId)
      setOrders(data)

      const allTickets = data.flatMap(order =>
        order.tickets.map(ticket => ({
          ...ticket,
          orderId: order.id,
        })),
      )

      allTickets.sort(
        (a, b) =>
          new Date(b.sessionStart).getTime() -
          new Date(a.sessionStart).getTime(),
      )

      setTickets(allTickets)
    } catch (err: any) {
      console.error(err)
      setError('Помилка завантаження даних користувача')
      setOrders([])
      setTickets([])
    } finally {
      setIsLoadingData(false)
    }
  }

  const selectUser = (userId: string) => {
    setSelectedUserId(userId)
    fetchUserData(userId)
  }

  const validateTicket = async (ticketId: string) => {
    try {
      const msg = await adminTicketsService.validate(ticketId)
      alert(msg)
      if (selectedUserId) fetchUserData(selectedUserId)
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Помилка валідації')
    }
  }

  const cancelOrder = async (orderId: string) => {
    if (
      !confirm(
        'Ви впевнені, що хочете скасувати це замовлення? Це також скасує всі квитки.',
      )
    )
      return

    try {
      await adminOrdersService.cancelOrder(orderId)
      if (selectedUserId) fetchUserData(selectedUserId)
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Помилка скасування замовлення')
    }
  }

  return {
    users,
    isLoadingUsers,
    selectedUserId,
    selectUser,
    orders,
    tickets,
    isLoadingData,
    error,
    validateTicket,
    cancelOrder,
  }
}
