import { useState, useCallback, useEffect } from 'react'
import { genresService, type Genre } from '../../../services/genresService'

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchGenres = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await genresService.getAll()
      setGenres(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to fetch genres', error)
      setGenres([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createGenre = async (externalId: number, name: string) => {
    try {
      await genresService.create(externalId, name)
      await fetchGenres()
      return { success: true }
    } catch (error: any) {
      const msg = error.response?.data?.title || 'Помилка створення жанру'
      return { success: false, error: msg }
    }
  }

  const updateGenre = async (externalId: number, name: string) => {
    try {
      await genresService.update(externalId, name)
      await fetchGenres()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: 'Помилка оновлення' }
    }
  }

  const deleteGenre = async (externalId: number) => {
    try {
      await genresService.delete(externalId)
      await fetchGenres()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: 'Помилка видалення' }
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [fetchGenres])

  return {
    genres,
    isLoading,
    fetchGenres,
    createGenre,
    updateGenre,
    deleteGenre,
  }
}
