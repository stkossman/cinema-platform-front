import { useState, useCallback, useEffect } from 'react'
import {
  adminTicketsService,
  type AdminTicketDto,
} from '../../../services/adminTicketsService'

export const useAdminTickets = () => {
  const [tickets, setTickets] = useState<AdminTicketDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchTickets = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminTicketsService.getAll(1, searchTerm)
      setTickets(data.items)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm])

  const validateTicket = async (id: string) => {
    try {
      const msg = await adminTicketsService.validate(id)
      alert(msg)
      fetchTickets()
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Помилка валідації')
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  return { tickets, isLoading, searchTerm, setSearchTerm, validateTicket }
}
