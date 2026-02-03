import { useState, useEffect, useCallback } from 'react'
import { moviesService } from '../../../services/moviesService'
import type { Movie } from '../../../types/movie'

interface PaginationState {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const useAdminMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [pagination, setPagination] = useState<PaginationState>({
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  })

  const fetchMovies = useCallback(async (page = 1, search = '') => {
    setIsLoading(true)
    try {
      const data = await moviesService.getPaginated(page, 10, search)
      setMovies(data.items)
      setPagination({
        pageNumber: data.pageNumber,
        pageSize: 10,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
        hasPreviousPage: data.hasPreviousPage,
        hasNextPage: data.hasNextPage,
      })
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies(1, searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm, fetchMovies])

  const changePage = (newPage: number) => {
    fetchMovies(newPage, searchTerm)
  }

  const deleteMovie = async (id: string) => {
    try {
      await moviesService.delete(id)
      await fetchMovies(pagination.pageNumber, searchTerm)
      return { success: true }
    } catch (error: any) {
      const msg =
        error.response?.data?.errors?.Detail ||
        error.response?.data?.detail ||
        'Не вдалося видалити фільм'
      return { success: false, error: msg }
    }
  }

  return {
    movies,
    isLoading,
    pagination,
    searchTerm,
    setSearchTerm,
    changePage,
    deleteMovie,
    refresh: () => fetchMovies(pagination.pageNumber, searchTerm),
  }
}
