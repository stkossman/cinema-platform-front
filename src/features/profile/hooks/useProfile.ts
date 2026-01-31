import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { ordersService } from '../../../services/ordersService'
import { type OrderItem } from '../../../types/order'

export type TabType = 'settings' | 'active-tickets' | 'history'

export const useProfile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<TabType>('active-tickets')
  const [activeTickets, setActiveTickets] = useState<OrderItem[]>([])
  const [historyOrders, setHistoryOrders] = useState<OrderItem[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return
      setIsLoadingTickets(true)
      try {
        const allOrders = await ordersService.getUserOrders(user.id)
        const active = allOrders.filter(o => o.status === 'active')
        const history = allOrders.filter(o => o.status !== 'active')
        setActiveTickets(active)
        setHistoryOrders(history)
      } catch (error) {
        console.error('Failed to load orders', error)
      } finally {
        setIsLoadingTickets(false)
      }
    }
    fetchOrders()
  }, [user])

  return {
    user,
    logout,
    activeTab,
    setActiveTab,
    activeTickets,
    historyOrders,
    isLoadingTickets,
  }
}
