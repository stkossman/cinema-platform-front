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
  const [moviesWithMeta, setMoviesWithMeta] = useState<MovieWithMeta[]>([])
  const [filteredMovies, setFilteredMovies] = useState<MovieWithMeta[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Всі' },
    { id: 'IMAX', label: 'IMAX' },
    { id: '4DX', label: '4DX' },
    { id: '3D', label: '3D' },
    { id: 'Dolby Atmos', label: 'Dolby' },
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        const [moviesData, hallsData] = await Promise.all([
          moviesService.getAll(),
          hallsService.getAll(),
        ])

        const hallTechMap: Record<string, string[]> = {}
        for (const hall of hallsData) {
          hallTechMap[hall.id] = hall.technologies?.map(t => t.name) || []
        }

        const enrichedMovies = await Promise.all(
          moviesData.map(async movie => {
            const sessions = await bookingService.getSessionsByMovieId(movie.id)
            const techSet = new Set<string>()

            for (const session of sessions) {
              const hallTechs = hallTechMap[session.hallId]
              if (hallTechs) {
                hallTechs.forEach(t => techSet.add(t))
              }
            }

            if (techSet.size === 0) techSet.add('2D')

            return {
              ...movie,
              sessions,
              technologies: Array.from(techSet),
            }
          }),
        )

        setMoviesWithMeta(enrichedMovies)
        setFilteredMovies(enrichedMovies)
      } catch (error) {
        console.error('Failed to load data', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredMovies(moviesWithMeta)
    } else {
      setFilteredMovies(
        moviesWithMeta.filter(m =>
          m.technologies.some(t => t.includes(activeFilter)),
        ),
      )
    }
  }, [activeFilter, moviesWithMeta])

  return {
    filteredMovies,
    isLoading,
    activeFilter,
    setActiveFilter,
    filters,
  }
}
