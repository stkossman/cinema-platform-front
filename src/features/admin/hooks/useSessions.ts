import { useState, useEffect, useCallback } from 'react'
import {
  adminSessionsService,
  type SessionDto,
} from '../../../services/adminSessionsService'

export const useSessions = () => {
  const [sessions, setSessions] = useState<SessionDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchSessions = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await adminSessionsService.getAll(1, 100)
      const safeData = Array.isArray(data) ? data : []

      const sorted = safeData.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      )
      setSessions(sorted)
    } catch (error) {
      console.error('Failed to fetch sessions', error)
      setSessions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteSession = async (id: string) => {
    try {
      await adminSessionsService.cancel(id)
      await fetchSessions()
      return true
    } catch (e) {
      return false
    }
  }

  const rescheduleSession = async (id: string, newDateIso: string) => {
    try {
      await adminSessionsService.reschedule(id, newDateIso)
      await fetchSessions()
      return { success: true }
    } catch (e: any) {
      const msg = e.response?.data?.errors?.Description || e.message
      return { success: false, error: msg }
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  return {
    sessions,
    isLoading,
    fetchSessions,
    deleteSession,
    rescheduleSession,
  }
}
