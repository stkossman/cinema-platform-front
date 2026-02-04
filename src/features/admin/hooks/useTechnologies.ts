import { useState, useCallback, useEffect } from 'react'
import { technologiesService } from '../../../services/technologiesService'
import type { Technology } from '../../../types/hall'

export const useTechnologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTechnologies = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await technologiesService.getAll()
      setTechnologies(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch technologies', error)
      setTechnologies([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createTechnology = async (name: string, type: string) => {
    try {
      await technologiesService.create(name, type)
      await fetchTechnologies()
      return { success: true }
    } catch (error: any) {
      const msg = error.response?.data?.title || 'Помилка створення'
      return { success: false, error: msg }
    }
  }

  useEffect(() => {
    fetchTechnologies()
  }, [fetchTechnologies])

  return {
    technologies,
    isLoading,
    fetchTechnologies,
    createTechnology,
  }
}
