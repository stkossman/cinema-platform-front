import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/AuthContext'
import { ordersService } from '../../../services/ordersService'
import { accountService } from '../../../services/accountService'
import type { OrderItem } from '../../../types/order'

export type TabType = 'active-tickets' | 'history' | 'settings'

export const useProfile = () => {
  const { user, logout, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('active-tickets')

  const [tickets, setTickets] = useState<OrderItem[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(false)

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

  const activeTickets = tickets.filter(
    t => new Date(t.sessionDate) > new Date() && t.status !== 'cancelled',
  )

  const historyOrders = tickets.filter(
    t => new Date(t.sessionDate) <= new Date() || t.status === 'cancelled',
  )

  return {
    user,
    logout,
    updateUser,
    activeTab,
    setActiveTab,
    activeTickets,
    historyOrders,
    isLoadingTickets,
  }
}
