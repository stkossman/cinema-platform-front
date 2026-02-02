import { useState, useEffect } from 'react'
import { moviesService } from '../../../services/moviesService'
import { bookingService } from '../../../services/bookingService'
import { hallsService } from '../../../services/hallsService'
import type { Movie } from '../../../types/movie'
import type { Session } from '../../../types/hall'

export interface MovieWithMeta extends Movie {
  sessions: Session[]
  technologies: string[]
}

export const useHomeMovies = () => {
  const [movies, setMovies] = useState<MovieWithMeta[]>([])
  const [filteredMovies, setFilteredMovies] = useState<MovieWithMeta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Всі' },
    { id: 'today', label: 'Сьогодні' },
    { id: 'soon', label: 'Скоро' },
    { id: 'imax', label: 'IMAX' },
  ]

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [moviesData, allSessions, hallsData] = await Promise.all([
          moviesService.getAll(),
          bookingService.getAllSessions(),
          hallsService.getAll(),
        ])

        const hallTechMap: Record<string, string[]> = {}
        hallsData.forEach(hall => {
          hallTechMap[hall.id] = hall.technologies?.map(t => t.name) || []
        })

        const enrichedMovies = moviesData.map(movie => {
          const movieSessions = allSessions.filter(s => s.movieId === movie.id)

          const techSet = new Set<string>()
          movieSessions.forEach(session => {
            const techs = hallTechMap[session.hallId]
            if (techs) techs.forEach(t => techSet.add(t))
          })

          if (techSet.size === 0) techSet.add('2D')

          return {
            ...movie,
            sessions: movieSessions,
            technologies: Array.from(techSet),
          }
        })

        setMovies(enrichedMovies)
        setFilteredMovies(enrichedMovies)
      } catch (error) {
        console.error('Failed to load home movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredMovies(movies)
      return
    }

    const now = new Date()
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const filtered = movies.filter(movie => {
      if (activeFilter === 'today') {
        return movie.sessions.some(s => {
          const sDate = new Date(s.startTime)
          return sDate >= now && sDate <= todayEnd
        })
      }
      if (activeFilter === 'soon') {
        return movie.sessions.every(s => new Date(s.startTime) > todayEnd)
      }
      if (activeFilter === 'imax') {
        return movie.technologies.some(t => t.toLowerCase().includes('imax'))
      }
      return true
    })

    setFilteredMovies(filtered)
  }, [activeFilter, movies])

  return {
    filteredMovies,
    isLoading,
    activeFilter,
    setActiveFilter,
    filters,
  }
}
