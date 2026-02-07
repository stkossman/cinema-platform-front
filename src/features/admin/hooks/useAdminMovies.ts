import { useState, useEffect } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { moviesService } from '../../../services/moviesService'

interface PaginationState {
  pageNumber: number
  pageSize: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export const useAdminMovies = () => {
  const queryClient = useQueryClient()

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['admin-movies', page, debouncedSearch],
    queryFn: () => moviesService.getPaginated(page, 10, debouncedSearch),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })

  const deleteMutation = useMutation({
    mutationFn: moviesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-movies'] })
    },
  })

  const deleteMovie = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      return { success: true }
    } catch (error: any) {
      const msg =
        error.response?.data?.errors?.Detail ||
        error.response?.data?.detail ||
        'Не вдалося видалити фільм'
      return { success: false, error: msg }
    }
  }

  const pagination: PaginationState = {
    pageNumber: data?.pageNumber || page,
    pageSize: 10,
    totalPages: data?.totalPages || 0,
    totalCount: data?.totalCount || 0,
    hasPreviousPage: data?.hasPreviousPage || false,
    hasNextPage: data?.hasNextPage || false,
  }

  return {
    movies: data?.items || [],
    isLoading: isLoading || (isPlaceholderData && !data),
    pagination,
    searchTerm,
    setSearchTerm,
    changePage: setPage,
    deleteMovie,
    refresh: () =>
      queryClient.invalidateQueries({ queryKey: ['admin-movies'] }),
  }
}
