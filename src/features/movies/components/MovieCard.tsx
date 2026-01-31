import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { type Movie } from '../../../types/movie'
import { type Session } from '../../../types/hall'

interface MovieCardProps {
  movie: Movie
  sessions: Session[]
  technologies: string[] // Новий проп: список технологій (IMAX, 3D...)
}

const MovieCard = ({ movie, sessions, technologies }: MovieCardProps) => {
  // Фільтруємо майбутні сеанси
  const nextSessions = sessions
    .filter(s => new Date(s.startTime) > new Date())
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    .slice(0, 3)

  return (
    <div className='group relative bg-[var(--bg-card)] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 h-full flex flex-col border border-white/5'>
      {/* Poster */}
      <div className='relative aspect-[2/3] overflow-hidden'>
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
          loading='lazy'
        />

        {/* Overlay Button */}
        <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]'>
          <Link
            to={`/movies/${movie.id}`}
            className='bg-[var(--color-primary)] text-white font-bold py-3 px-8 rounded-full transform scale-90 group-hover:scale-100 transition-transform shadow-[0_0_20px_rgba(239,68,68,0.5)]'
          >
            Детальніше
          </Link>
        </div>

        {/* Rating */}
        <div className='absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[var(--color-primary)] text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[var(--color-primary)]/30 flex items-center gap-1'>
          <Star size={12} fill='currentColor' />
          {movie.rating}
        </div>
      </div>

      {/* Info */}
      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='text-xl font-bold text-white mb-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2'>
          {movie.title}
        </h3>
        <p className='text-sm text-[var(--text-muted)] mb-5 line-clamp-1'>
          {movie.genres.join(', ') || 'Жанр не вказано'}
        </p>

        <div className='mt-auto space-y-4'>
          {/* Showtimes */}
          <div className='flex flex-wrap gap-2'>
            {nextSessions.length > 0 ? (
              nextSessions.map(st => (
                <Link
                  key={st.id}
                  to={`/booking/${movie.id}`}
                  className='cursor-pointer bg-white/5 hover:bg-[var(--color-primary)] hover:text-white border border-white/10 rounded-lg px-3 py-1.5 text-center transition-all duration-200 flex-grow sm:flex-grow-0 min-w-[60px]'
                >
                  <span className='block text-sm font-bold'>
                    {new Date(st.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <span className='block text-[10px] opacity-70 font-medium'>
                    {st.priceBase || 150} ₴
                  </span>
                </Link>
              ))
            ) : (
              <span className='text-xs text-[var(--text-muted)] italic py-2'>
                На сьогодні сеансів немає
              </span>
            )}
          </div>

          {/* Tech badges (Real data) */}
          {technologies.length > 0 && (
            <div className='flex gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/5'>
              {technologies.map(t => (
                <span
                  key={t}
                  className='text-[10px] font-bold uppercase border border-white/20 text-[var(--text-muted)] px-1.5 py-0.5 rounded bg-white/5 whitespace-nowrap'
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
