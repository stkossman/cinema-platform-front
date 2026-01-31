import {
  Star,
  Calendar,
  Clock,
  Play,
  ArrowLeft,
  Tv,
  Ticket,
} from 'lucide-react'
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
    <div className='relative min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] pb-20'>
      <div className='relative h-[80vh] w-full overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className='h-full w-full object-cover object-top opacity-70 scale-105 animate-in fade-in zoom-in-95 duration-[2s]'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/30 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-[var(--bg-main)]/90 via-transparent to-transparent' />
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

        <div className='absolute bottom-0 left-0 w-full px-4 pb-16 sm:px-8 lg:px-16'>
          <div className='container mx-auto animate-in slide-in-from-bottom-10 fade-in duration-700'>
            <div className='mb-6 flex flex-wrap items-center gap-4 text-sm font-bold tracking-wide text-[var(--text-muted)]'>
              <span className='flex items-center gap-1.5 text-white bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 px-3 py-1 rounded-lg backdrop-blur-md'>
                <Star
                  className='fill-current text-[var(--color-success)]'
                  size={14}
                />
                {movie.rating} IMDb
              </span>
              <span className='flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md text-white'>
                <Calendar size={14} className='text-[var(--color-primary)]' />
                {movie.year}
              </span>
              <span className='flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md text-white'>
                <Clock size={14} className='text-[var(--color-primary)]' />
                {movie.duration} хв
              </span>

              <div className='flex gap-2 ml-2'>
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className='text-xs uppercase tracking-wider text-[var(--text-muted)] border-b border-transparent hover:border-[var(--color-primary)] hover:text-white transition-colors cursor-default'
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <h1 className='mb-4 text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl text-white drop-shadow-2xl leading-[0.9] max-w-4xl'>
              {movie.title}
            </h1>
            <p className='mb-10 text-xl italic text-zinc-300 font-serif max-w-2xl border-l-4 border-[var(--color-primary)] pl-6'>
              "{movie.tagline || 'Епічна кіноподія, яку не можна пропустити'}"
            </p>

            <div className='hidden sm:flex flex-wrap gap-4'>
              <button
                type='button'
                onClick={handleBookingClick}
                className='group flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-10 py-4 text-lg font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)]'
              >
                <Play className='fill-current' size={20} />
                Купити квиток
              </button>

              {movie.videoUrl && (
                <a
                  href={movie.videoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white'
                >
                  <Tv size={20} />
                  Трейлер
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16 sm:px-8 lg:px-16'>
        <div className='grid gap-16 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-12'>
            <section>
              <h3 className='mb-6 text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2'>
                <span className='w-8 h-1 bg-[var(--color-primary)] rounded-full'></span>
                Сюжет
              </h3>
              <p className='text-lg leading-relaxed text-[var(--text-muted)]'>
                {movie.description}
              </p>
            </section>

            <section>
              <h3 className='mb-8 text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2'>
                <span className='w-8 h-1 bg-[var(--color-primary)] rounded-full'></span>
                Акторський склад
              </h3>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className='group cursor-pointer relative overflow-hidden rounded-xl border border-white/5 glass-panel transition-all hover:-translate-y-2 hover:shadow-lg'
                  >
                    <div className='aspect-[2/3] w-full bg-[var(--bg-card)]'>
                      <div className='h-full w-full bg-zinc-800 transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100' />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90'></div>
                    <div className='absolute bottom-0 left-0 p-4'>
                      <div className='font-bold text-white group-hover:text-[var(--color-primary)] transition-colors text-sm'>
                        Timothée Chalamet
                      </div>
                      <div className='text-xs text-[var(--text-muted)]'>
                        Paul Atreides
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className='space-y-8 glass-panel rounded-2xl p-8 h-fit shadow-2xl'>
            <div className='space-y-1'>
              <div className='text-xs text-[var(--text-muted)] uppercase tracking-widest'>
                Режисер
              </div>
              <div className='text-lg font-bold text-white'>
                Denis Villeneuve
              </div>
            </div>
            <div className='space-y-1'>
              <div className='text-xs text-[var(--text-muted)] uppercase tracking-widest'>
                Сценаристи
              </div>
              <div className='text-lg font-medium text-zinc-300'>
                Jon Spaihts, Denis Villeneuve
              </div>
            </div>
            <div className='space-y-1'>
              <div className='text-xs text-[var(--text-muted)] uppercase tracking-widest'>
                Бюджет
              </div>
              <div className='text-lg font-medium text-zinc-300'>
                $190,000,000
              </div>
            </div>

            <hr className='border-white/10' />

            <div className='space-y-1'>
              <div className='text-xs text-[var(--text-muted)] uppercase tracking-widest'>
                Статус
              </div>
              <div className='text-lg font-bold text-[var(--color-success)] flex items-center gap-2'>
                <span className='relative flex h-3 w-3'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                </span>
                У прокаті
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-4 glass-panel border-t border-white/10 sm:hidden z-40'>
        <button
          type='button'
          onClick={handleBookingClick}
          className='w-full flex items-center justify-center gap-3 rounded-xl bg-[var(--color-primary)] py-3 text-base font-bold text-white shadow-lg active:scale-95 transition-transform'
        >
          <Ticket size={20} />
          Купити квиток
        </button>
      </div>
    </div>
  )
}

export default MovieDetails
