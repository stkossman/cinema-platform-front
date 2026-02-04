import { useEffect, useState } from 'react'
import { type Movie, MovieStatus } from '../../../types/movie'
import { type Session } from '../../../types/hall'
import { moviesService } from '../../../services/moviesService'
import { bookingService } from '../../../services/bookingService'
import { hallsService } from '../../../services/hallsService'
import MovieCard from './MovieCard'
import { Loader2, Film, Clock, Archive } from 'lucide-react'

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
        const [moviesData, allSessions, hallsData] = await Promise.all([
          moviesService.getAll(),
          bookingService.getAllSessions(),
          hallsService.getAll(),
        ])

        const hallTechMap: Record<string, string[]> = {}
        for (const hall of hallsData) {
          hallTechMap[hall.id] = hall.technologies?.map(t => t.name) || []
        }

        const enrichedMovies = moviesData.map(movie => {
          const sessions = allSessions.filter(s => s.movieId === movie.id)

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
        })

        setMovies(enrichedMovies)
      } catch (error) {
        console.error('Failed to load movies data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const activeMovies = movies.filter(m => m.status === MovieStatus.Active)
  const comingSoonMovies = movies.filter(
    m => m.status === MovieStatus.ComingSoon,
  )
  const archivedMovies = movies.filter(m => m.status === MovieStatus.Archived)

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
    <div className='space-y-16'>
      {activeMovies.length > 0 && (
        <section className='animate-in fade-in slide-in-from-bottom-4 duration-700'>
          <div className='flex items-center gap-3 mb-8'>
            <div className='h-8 w-1 bg-[var(--color-primary)] rounded-full'></div>
            <h2 className='text-2xl font-black text-white uppercase tracking-wide'>
              Зараз у кіно
            </h2>
          </div>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {activeMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                sessions={movie.sessions}
                technologies={movie.technologies}
              />
            ))}
          </div>
        </section>
      )}

      {comingSoonMovies.length > 0 && (
        <section className='animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100'>
          <div className='flex items-center gap-3 mb-8'>
            <div className='h-8 w-1 bg-yellow-500 rounded-full'></div>
            <h2 className='text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2'>
              <Clock className='text-yellow-500' /> Скоро
            </h2>
          </div>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {comingSoonMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                sessions={[]}
                technologies={movie.technologies}
              />
            ))}
          </div>
        </section>
      )}

      {archivedMovies.length > 0 && (
        <section className='animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 opacity-60 hover:opacity-100 transition-opacity'>
          <div className='flex items-center gap-3 mb-8'>
            <div className='h-8 w-1 bg-zinc-600 rounded-full'></div>
            <h2 className='text-2xl font-black text-zinc-400 uppercase tracking-wide flex items-center gap-2'>
              <Archive className='text-zinc-500' /> Архів
            </h2>
          </div>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {archivedMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                sessions={[]}
                technologies={movie.technologies}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default MoviesGrid
