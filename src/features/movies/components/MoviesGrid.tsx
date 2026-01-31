import { useEffect, useState } from 'react'
import { type Movie } from '../../../types/movie'
import { moviesService } from '../../../services/moviesService'
import MovieCard from './MovieCard'
import { Loader2, Film } from 'lucide-react'

const MoviesGrid = () => {
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
      <div className='flex h-64 w-full items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-600' />
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className='flex h-64 w-full flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 text-zinc-500'>
        <Film className='mb-2 h-10 w-10 opacity-50' />
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
          sessions={[]}
          technologies={[]}
        />
      ))}
    </div>
  )
}

export default MoviesGrid
