import { Star, Calendar, Clock, Play, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { type Movie } from '../../../types/movie'

interface MovieDetailsProps {
  movie: Movie
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className='relative min-h-screen bg-black text-white selection:bg-red-500/30'>
      <div className='relative h-[70vh] w-full overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className='h-full w-full object-cover object-top opacity-80'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent' />
        </div>

        <div className='absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10'>
          <Link
            to='/'
            className='flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium backdrop-blur-md hover:bg-white/10 transition-colors'
          >
            <ArrowLeft size={16} />
            Назад
          </Link>
        </div>

        <div className='absolute bottom-0 left-0 w-full px-4 pb-12 sm:px-8 lg:px-16'>
          <div className='container mx-auto animate-in slide-in-from-bottom-10 fade-in duration-700'>
            <div className='mb-4 flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-300'>
              <span className='flex items-center gap-1 text-yellow-500'>
                <Star className='fill-current' size={16} />
                {movie.rating}
              </span>
              <span className='flex items-center gap-1'>
                <Calendar size={16} />
                {movie.year}
              </span>
              <span className='flex items-center gap-1'>
                <Clock size={16} />
                2h 46m
              </span>
              <div className='h-1 w-1 rounded-full bg-zinc-500' />
              <div className='flex gap-2'>
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className='rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs uppercase tracking-wider'
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <h1 className='mb-2 text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl'>
              {movie.title}
            </h1>
            <p className='mb-8 text-xl italic text-zinc-400 font-serif'>
              "{movie.tagline}"
            </p>

            <div className='flex flex-wrap gap-4'>
              <Link
                to={`/booking/${movie.id}`}
                className='group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:scale-105 active:scale-95'
              >
                <Play
                  className='fill-current group-hover:text-red-600 transition-colors'
                  size={20}
                />
                Дивитися розклад
              </Link>
              <button
                type='button'
                className='rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white'
              >
                Трейлер
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16 sm:px-8 lg:px-16'>
        <div className='grid gap-12 lg:grid-cols-[2fr_1fr]'>
          <div className='space-y-10'>
            <section>
              <h3 className='mb-4 text-lg font-bold uppercase tracking-wider text-zinc-500'>
                Сюжет
              </h3>
              <p className='text-lg leading-relaxed text-zinc-200'>
                {movie.description}
              </p>
            </section>

            <section>
              <h3 className='mb-6 text-lg font-bold uppercase tracking-wider text-zinc-500'>
                Акторський склад
              </h3>
              {/* mock Cast grid */}
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className='group cursor-pointer space-y-2'>
                    <div className='aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-900'>
                      <div className='h-full w-full bg-zinc-800 transition-transform duration-500 group-hover:scale-110 opacity-50' />
                    </div>
                    <div>
                      <div className='font-bold text-white'>Actor Name</div>
                      <div className='text-xs text-zinc-500'>Character</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className='space-y-8 rounded-2xl border border-white/5 bg-zinc-900/30 p-8 h-fit backdrop-blur-sm'>
            <div>
              <div className='text-sm text-zinc-500'>Режисер</div>
              <div className='text-lg font-medium text-white'>
                Denis Villeneuve
              </div>
            </div>
            <div>
              <div className='text-sm text-zinc-500'>Сценаристи</div>
              <div className='text-lg font-medium text-white'>
                Jon Spaihts, Denis Villeneuve
              </div>
            </div>
            <div>
              <div className='text-sm text-zinc-500'>Бюджет</div>
              <div className='text-lg font-medium text-white'>$190,000,000</div>
            </div>
            <hr className='border-white/5' />
            <div>
              <div className='text-sm text-zinc-500'>Статус</div>
              <div className='text-lg font-medium text-green-500'>
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
