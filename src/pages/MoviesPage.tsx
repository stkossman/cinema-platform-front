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
      <div className='flex h-screen w-full items-center justify-center bg-zinc-950'>
        <Loader2 className='h-10 w-10 animate-spin text-zinc-600' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-zinc-950 py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>Всі фільми</h1>
          <p className='mt-2 text-zinc-400'>
            Актуальний список кінострічок у прокаті
          </p>
        </div>

        <div className='overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-white/5 text-zinc-400'>
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
                    className='group transition-colors hover:bg-white/5'
                  >
                    <td className='px-6 py-4'>
                      <div className='h-16 w-24 overflow-hidden rounded-lg'>
                        <img
                          src={movie.backdropUrl}
                          alt={movie.title}
                          className='h-full w-full object-cover transition-transform group-hover:scale-110'
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='font-bold text-white text-base'>
                        {movie.title}
                      </div>
                      <div className='text-xs text-zinc-500'>
                        {movie.genres.join(', ') || 'Sci-Fi'}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1.5 font-medium text-yellow-500'>
                        <Star size={14} fill='currentColor' />
                        {movie.rating}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-zinc-300'>
                      <div className='flex items-center gap-1.5'>
                        <Calendar size={14} className='text-zinc-500' />
                        {movie.year}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-zinc-300'>
                      <div className='flex items-center gap-1.5'>
                        <Clock size={14} className='text-zinc-500' />
                        {movie.duration} хв
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <Link
                        to={`/movies/${movie.id}`}
                        className='inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-zinc-200'
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
            <div className='p-12 text-center text-zinc-500'>
              Фільмів не знайдено
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MoviesPage
