import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesService } from '../services/moviesService'
import { bookingService } from '../services/bookingService'
import { hallsService } from '../services/hallsService'
import { type Movie } from '../types/movie'
import { type Session } from '../types/hall'
import MovieCard from '../features/movies/components/MovieCard'
import PromoSection from '../features/home/components/PromoSection'
import { Loader2, Ticket, Play, Film } from 'lucide-react'

interface MovieWithMeta extends Movie {
  sessions: Session[]
  technologies: string[]
}

const HomePage = () => {
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

  const heroMovie = moviesWithMeta.length > 0 ? moviesWithMeta[0] : null

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[var(--bg-main)]'>
        <Loader2 className='h-12 w-12 animate-spin text-[var(--color-primary)]' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[var(--bg-main)] font-sans pb-20'>
      {heroMovie && (
        <div className='relative w-full h-[600px] md:h-[700px] overflow-hidden group'>
          <div className='absolute inset-0'>
            <img
              src={heroMovie.backdropUrl}
              alt={heroMovie.title}
              className='w-full h-full object-cover transition-transform duration-[20s] ease-in-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/60 to-transparent'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-[var(--bg-main)]/90 via-transparent to-transparent'></div>
          </div>

          <div className='absolute inset-0 container mx-auto px-4 flex flex-col justify-end pb-20 md:pb-32'>
            <div className='max-w-2xl animate-in slide-in-from-left-10 fade-in duration-1000'>
              <div className='flex flex-wrap gap-2 mb-4'>
                <span className='bg-[var(--color-primary)] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--color-primary)]/20'>
                  Прем'єра
                </span>
                {heroMovie.technologies.map(t => (
                  <span
                    key={t}
                    className='bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold border border-white/20 uppercase'
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h1 className='text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-2xl'>
                {heroMovie.title}
              </h1>

              <p className='text-gray-300 mb-8 line-clamp-3 md:line-clamp-none max-w-xl text-lg leading-relaxed drop-shadow-md'>
                {heroMovie.description}
              </p>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link
                  to={`/booking/${heroMovie.id}`}
                  className='bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3.5 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2'
                >
                  <Ticket size={20} />
                  Купити квиток
                </Link>
                <Link
                  to={`/movies/${heroMovie.id}`}
                  className='bg-transparent border border-white/30 hover:bg-white hover:text-black text-white font-bold py-3.5 px-8 rounded-full transition-all flex items-center justify-center gap-2 backdrop-blur-sm'
                >
                  <Play size={20} className='fill-current' />
                  Дивитись трейлер
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto px-4 -mt-10 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-8 gap-6'>
          <h2 className='text-3xl font-bold text-white pl-4 border-l-4 border-[var(--color-primary)] leading-none'>
            Зараз у кіно
          </h2>

          <div className='flex flex-wrap gap-2 p-1 bg-[var(--bg-card)] rounded-xl border border-white/5'>
            {filters.map(f => (
              <button
                type='button'
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25'
                    : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-[var(--text-muted)] bg-[var(--bg-card)] rounded-2xl border border-dashed border-white/10'>
            <Film size={48} className='opacity-20 mb-4' />
            <p>Фільмів з такими параметрами не знайдено</p>
            <button
              type='button'
              onClick={() => setActiveFilter('all')}
              className='mt-4 text-[var(--color-primary)] hover:underline'
            >
              Показати всі фільми
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8'>
            {filteredMovies.map(movie => (
              <div key={movie.id} className='h-[600px]'>
                <MovieCard
                  movie={movie}
                  sessions={movie.sessions}
                  technologies={movie.technologies}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <PromoSection />
    </div>
  )
}

export default HomePage
