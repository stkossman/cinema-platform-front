import { Play, Info, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { type Movie } from '../../../types/movie'
import { moviesService } from '../../../services/moviesService'
import { useAuth } from '../../../features/auth/AuthContext'

const HeroSection = () => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const movies = await moviesService.getAll()
        if (movies.length > 0) {
          setMovie(movies[0])
        }
      } catch (error) {
        console.error('Failed to load hero movie', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  const handleBuyTicket = () => {
    if (!movie) return

    if (!user) {
      navigate('/auth/login')
    } else {
      navigate(`/booking/${movie.id}`)
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-[85vh] w-full items-center justify-center bg-zinc-950'>
        <Loader2 className='h-10 w-10 animate-spin text-zinc-700' />
      </div>
    )
  }

  if (!movie) return null

  return (
    <section className='relative h-[85vh] w-full overflow-hidden'>
      <div className='absolute inset-0'>
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className='h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent' />
      </div>

      <div className='relative container mx-auto flex h-full flex-col justify-end px-4 pb-20'>
        <div className='max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700'>
          <div className='flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-zinc-300'>
            <span className='rounded bg-white/10 px-2 py-1 backdrop-blur-sm'>
              {movie.year}
            </span>
            <span className='rounded bg-yellow-500/80 px-2 py-1 text-black'>
              IMDb {movie.rating}
            </span>
            <div className='flex gap-2'>
              {movie.genres.map(genre => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          </div>

          <h1 className='text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl'>
            {movie.title}
          </h1>

          <p className='line-clamp-3 text-lg text-zinc-300 sm:text-xl'>
            {movie.description}
          </p>

          <div className='flex flex-wrap gap-4 pt-4'>
            <button
              type='button'
              onClick={handleBuyTicket}
              className='group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105 active:scale-95'
            >
              <Play className='size-5 fill-current' />
              Купити квиток
            </button>

            <Link
              to={`/movies/${movie.id}`}
              className='flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95'
            >
              <Info className='size-5' />
              Детальніше
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
