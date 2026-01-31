import { useEffect, useState } from 'react'
import { type Movie } from '../../../types/movie'
import { type Session } from '../../../types/hall'
import { moviesService } from '../../../services/moviesService'
import { bookingService } from '../../../services/bookingService'
import { hallsService } from '../../../services/hallsService'
import MovieCard from './MovieCard'
import { Loader2, Film } from 'lucide-react'

interface MovieWithMeta extends Movie {
  sessions: Session[]
  technologies: string[]
}

const MoviesGrid = () => {
  const [movies, setMovies] = useState<MovieWithMeta[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
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

        setMovies(enrichedMovies)
      } catch (error) {
        console.error('Failed to load movies data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className='flex h-64 w-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-[var(--color-primary)]' />
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className='flex h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[var(--bg-card)] text-[var(--text-muted)]'>
        <Film className='mb-2 h-10 w-10 opacity-20' />
        <p>Фільмів поки немає</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          sessions={movie.sessions}
          technologies={movie.technologies}
        />
      ))}
    </div>
  )
}

export default MoviesGrid
