import { Star, Calendar, Clock, Play, ArrowLeft, Tv } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { type Movie } from '../../../types/movie'
import { useAuth } from '../../../features/auth/AuthContext'

interface MovieDetailsProps {
  movie: Movie
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleBookingClick = () => {
    if (!user) {
      navigate('/auth/login')
    } else {
      navigate(`/booking/${movie.id}`)
    }
  }

  return (
    <div className='relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-[var(--color-primary)]/30'>
      <div className='relative h-[70vh] w-full overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className='h-full w-full object-cover object-top opacity-80'
          />

          <div className='absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent' />
        </div>

        <div className='absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10'>
          <Link
            to='/'
            className='flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium backdrop-blur-md hover:bg-white/10 border border-white/5 transition-colors text-white'
          >
            <ArrowLeft size={16} />
            Назад
          </Link>
        </div>

        <div className='absolute bottom-0 left-0 w-full px-4 pb-12 sm:px-8 lg:px-16'>
          <div className='container mx-auto animate-in slide-in-from-bottom-10 fade-in duration-700'>
            <div className='mb-4 flex flex-wrap items-center gap-4 text-sm font-medium text-[var(--text-muted)]'>
              <span className='flex items-center gap-1 text-[var(--color-primary)] font-bold'>
                <Star className='fill-current' size={16} />
                {movie.rating}
              </span>
              <span className='flex items-center gap-1'>
                <Calendar size={16} />
                {movie.year}
              </span>
              <span className='flex items-center gap-1'>
                <Clock size={16} />
                {movie.duration} хв
              </span>
              <div className='h-1 w-1 rounded-full bg-zinc-500' />
              <div className='flex gap-2'>
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className='rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs uppercase tracking-wider text-zinc-300'
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <h1 className='mb-2 text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl text-white'>
              {movie.title}
            </h1>
            <p className='mb-8 text-xl italic text-[var(--text-muted)] font-serif'>
              "{movie.tagline}"
            </p>

            <div className='flex flex-wrap gap-4'>
              <button
                type='button'
                onClick={handleBookingClick}
                className='group flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-8 py-4 text-base font-bold text-[var(--color-on-primary)] transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:brightness-110'
              >
                <Play className='fill-current transition-colors' size={20} />
                Дивитися розклад
              </button>

              {movie.videoUrl ? (
                <a
                  href={movie.videoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white'
                >
                  <Tv size={20} />
                  Трейлер
                </a>
              ) : (
                <button
                  type='button'
                  disabled
                  className='cursor-not-allowed opacity-50 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-[var(--text-muted)]'
                >
                  Трейлер недоступний
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16 sm:px-8 lg:px-16'>
        <div className='grid gap-12 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-10'>
            <section>
              <h3 className='mb-4 text-lg font-bold uppercase tracking-wider text-[var(--color-primary)]/80'>
                Сюжет
              </h3>
              <p className='text-lg leading-relaxed text-zinc-300'>
                {movie.description}
              </p>
            </section>

            <section>
              <h3 className='mb-6 text-lg font-bold uppercase tracking-wider text-[var(--color-primary)]/80'>
                Акторський склад
              </h3>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className='group cursor-pointer space-y-2'>
                    <div className='aspect-[2/3] w-full overflow-hidden rounded-lg bg-[var(--bg-card)]'>
                      <div className='h-full w-full bg-zinc-800 transition-transform duration-500 group-hover:scale-110 opacity-50' />
                    </div>
                    <div>
                      <div className='font-bold text-white group-hover:text-[var(--color-primary)] transition-colors'>
                        Actor Name
                      </div>
                      <div className='text-xs text-[var(--text-muted)]'>
                        Character
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className='space-y-8 rounded-2xl border border-white/5 bg-[var(--bg-card)] p-8 h-fit backdrop-blur-sm shadow-xl'>
            <div>
              <div className='text-sm text-[var(--text-muted)]'>Режисер</div>
              <div className='text-lg font-medium text-white'>
                Denis Villeneuve
              </div>
            </div>
            <div>
              <div className='text-sm text-[var(--text-muted)]'>Сценаристи</div>
              <div className='text-lg font-medium text-white'>
                Jon Spaihts, Denis Villeneuve
              </div>
            </div>
            <div>
              <div className='text-sm text-[var(--text-muted)]'>Бюджет</div>
              <div className='text-lg font-medium text-white'>$190,000,000</div>
            </div>
            <hr className='border-white/5' />
            <div>
              <div className='text-sm text-[var(--text-muted)]'>Статус</div>
              <div className='text-lg font-medium text-[var(--color-success)]'>
                У прокаті
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
