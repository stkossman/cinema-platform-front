import { useState, useCallback, useEffect } from 'react'
import {
  adminOrdersService,
  type AdminOrderDto,
} from '../../../services/adminOrdersService'

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<AdminOrderDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchOrders = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminOrdersService.getAll(1, searchTerm)
      setOrders(data.items)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return { orders, isLoading, searchTerm, setSearchTerm, refresh: fetchOrders }
}
