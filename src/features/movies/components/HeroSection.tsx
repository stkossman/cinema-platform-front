import { Play, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

// temporary mock data
const FEATURED_MOVIE = {
  id: 1,
  title: 'Dune: Part Two',
  tagline: 'Long live the fighters.',
  description:
    'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
  backdropUrl:
    'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
  genres: ['Sci-Fi', 'Adventure'],
  rating: 8.3,
  year: 2024,
}

const HeroSection = () => {
  return (
    <section className='relative h-[85vh] w-full overflow-hidden'>
      <div className='absolute inset-0'>
        <img
          src={FEATURED_MOVIE.backdropUrl}
          alt={FEATURED_MOVIE.title}
          className='h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent' />
      </div>

      <div className='relative container mx-auto flex h-full flex-col justify-end px-4 pb-20'>
        <div className='max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700'>
          <div className='flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-zinc-300'>
            <span className='rounded bg-white/10 px-2 py-1 backdrop-blur-sm'>
              {FEATURED_MOVIE.year}
            </span>
            <span className='rounded bg-yellow-500/80 px-2 py-1 text-black'>
              IMDb {FEATURED_MOVIE.rating}
            </span>
            <div className='flex gap-2'>
              {FEATURED_MOVIE.genres.map(genre => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          </div>

          <h1 className='text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl'>
            {FEATURED_MOVIE.title}
          </h1>

          <p className='line-clamp-3 text-lg text-zinc-300 sm:text-xl'>
            {FEATURED_MOVIE.description}
          </p>

          <div className='flex flex-wrap gap-4 pt-4'>
            <Link
              to={`/booking/${FEATURED_MOVIE.id}`}
              className='group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105 active:scale-95'
            >
              <Play className='size-5 fill-current' />
              Купити квиток
            </Link>

            <Link
              to={`/movies/${FEATURED_MOVIE.id}`}
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
