import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { moviesService } from '../services/moviesService'
import { type Movie } from '../types/movie'
import { Loader2, Star, Clock, Calendar, ArrowRight } from 'lucide-react'

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await moviesService.getAll()
        setMovies(data)
      } catch (error) {
        console.error('Failed to load movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[var(--bg-main)]'>
        <Loader2 className='h-10 w-10 animate-spin text-[var(--color-primary)]' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[var(--bg-main)] py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>Всі фільми</h1>
          <p className='mt-2 text-[var(--text-muted)]'>
            Актуальний список кінострічок у прокаті
          </p>
        </div>

        <div className='overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] shadow-2xl backdrop-blur-sm'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-white/5 text-[var(--text-muted)] uppercase text-xs tracking-wider'>
                <tr>
                  <th className='px-6 py-4 font-medium'>Постер</th>
                  <th className='px-6 py-4 font-medium'>Назва</th>
                  <th className='px-6 py-4 font-medium'>Рейтинг</th>
                  <th className='px-6 py-4 font-medium'>Рік</th>
                  <th className='px-6 py-4 font-medium'>Тривалість</th>
                  <th className='px-6 py-4 font-medium text-right'>Дії</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {movies.map(movie => (
                  <tr
                    key={movie.id}
                    className='group transition-colors hover:bg-white/[0.02]'
                  >
                    <td className='px-6 py-4'>
                      <div className='h-16 w-24 overflow-hidden rounded-lg bg-zinc-900 border border-white/5'>
                        <img
                          src={movie.backdropUrl}
                          alt={movie.title}
                          className='h-full w-full object-cover transition-transform group-hover:scale-110'
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='font-bold text-white text-base group-hover:text-[var(--color-primary)] transition-colors'>
                        {movie.title}
                      </div>
                      <div className='text-xs text-[var(--text-muted)]'>
                        {movie.genres.join(', ') || 'Sci-Fi'}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1.5 font-bold text-[var(--color-primary)]'>
                        <Star size={14} fill='currentColor' />
                        {movie.rating}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-zinc-300'>
                      <div className='flex items-center gap-1.5'>
                        <Calendar
                          size={14}
                          className='text-[var(--text-muted)]'
                        />
                        {movie.year}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-zinc-300'>
                      <div className='flex items-center gap-1.5'>
                        <Clock size={14} className='text-[var(--text-muted)]' />
                        {movie.duration} хв
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <Link
                        to={`/movies/${movie.id}`}
                        className='inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-[var(--color-on-primary)] transition-all hover:brightness-110 hover:shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                      >
                        Детальніше <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {movies.length === 0 && (
            <div className='p-12 text-center text-[var(--text-muted)]'>
              Фільмів не знайдено
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MoviesPage
