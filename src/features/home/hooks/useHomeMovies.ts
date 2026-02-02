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
    { id: 'imax', label: 'IMAX' },
    { id: 'dolby', label: 'Dolby Atmos' },
    { id: 'dbox', label: 'D-Box' },
    { id: '3d', label: '3D' },
    { id: '4dx', label: '4DX' },
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

    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const filtered = movies.filter(movie => {
      const techs = movie.technologies.map(t => t.toLowerCase())

      if (activeFilter === 'imax') return techs.some(t => t.includes('imax'))
      if (activeFilter === 'dolby')
        return techs.some(t => t.includes('dolby') || t.includes('atmos'))
      if (activeFilter === 'dbox')
        return techs.some(t => t.includes('d-box') || t.includes('dbox'))
      if (activeFilter === '3d') return techs.some(t => t === '3d')
      if (activeFilter === '4dx') return techs.some(t => t.includes('4dx'))

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
