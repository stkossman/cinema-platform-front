import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type Movie } from '../types/movie'
import { moviesService } from '../services/moviesService'
import MovieDetails from '../features/movies/components/MovieDetails'
import NotFoundPage from './NotFoundPage'
import { Loader2 } from 'lucide-react'

const MoviePage = () => {
  const { id } = useParams<{ id: string }>()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return

      setIsLoading(true)
      try {
        const data = await moviesService.getById(id)
        setMovie(data)
      } catch (error) {
        console.error('Failed to fetch movie', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[var(--bg-main)] text-white'>
        <Loader2 className='h-10 w-10 animate-spin text-[var(--color-primary)]' />
      </div>
    )
  }

  if (!movie || !id) {
    return <NotFoundPage />
  }

  return <MovieDetails movie={movie} />
}

export default MoviePage
