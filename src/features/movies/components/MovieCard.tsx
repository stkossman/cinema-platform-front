import { Link } from 'react-router-dom'
import { Star, Calendar, Clock } from 'lucide-react'
import { type Movie } from '../../../types/movie'

interface MovieCardProps {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className='group relative flex flex-col gap-3 transition-all hover:-translate-y-1'
    >
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/5 shadow-lg transition-all group-hover:border-white/20 group-hover:shadow-red-900/10'>
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110'
          loading='lazy'
        />

        <div className='absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-bold text-yellow-500 backdrop-blur-md border border-white/10'>
          <Star size={12} fill='currentColor' />
          {movie.rating}
        </div>
      </div>

      <div className='space-y-1'>
        <h3 className='truncate text-lg font-bold text-white transition-colors group-hover:text-red-500'>
          {movie.title}
        </h3>
        <div className='flex items-center gap-3 text-xs text-zinc-400'>
          <span className='flex items-center gap-1'>
            <Calendar size={12} />
            {movie.year}
          </span>
          <span className='h-1 w-1 rounded-full bg-zinc-600' />
          <span className='flex items-center gap-1'>
            <Clock size={12} />
            {movie.duration} хв
          </span>
        </div>
        <div className='text-xs text-zinc-500 truncate'>
          {movie.genres.join(', ') || 'Sci-Fi'}
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
