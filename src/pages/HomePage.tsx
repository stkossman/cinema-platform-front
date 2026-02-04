import MovieCard from '../features/movies/components/MovieCard'
import PromoSection from '../features/home/components/PromoSection'
import HeroSection from '../features/movies/components/HeroSection'
import { Loader2, Film } from 'lucide-react'
import { useHomeMovies } from '../features/home/hooks/useHomeMovies'
import { useMemo } from 'react'
import { MovieStatus } from '../types/movie'

const HomePage = () => {
  const { filteredMovies, isLoading, activeFilter, setActiveFilter, filters } =
    useHomeMovies()

  const moviesToShow = useMemo(() => {
    return filteredMovies
      .filter(movie => movie.status === MovieStatus.Active)
      .slice(0, 4)
  }, [filteredMovies])

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[var(--bg-main)]'>
        <Loader2 className='h-12 w-12 animate-spin text-[var(--color-primary)]' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[var(--bg-main)] font-sans pb-20'>
      <HeroSection />

      <div className='container mx-auto px-4 -mt-10 relative z-10'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-8 gap-6'>
          <h2 className='text-3xl font-bold text-white pl-4 border-l-4 border-[var(--color-primary)] leading-none'>
            Зараз у кіно
          </h2>

          <div className='flex flex-wrap gap-2 p-1 bg-[var(--bg-card)] rounded-xl border border-white/5'>
            {filters.map(f => (
              <button
                type='button'
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeFilter === f.id
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25'
                    : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {moviesToShow.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-[var(--text-muted)] bg-[var(--bg-card)] rounded-2xl border border-dashed border-white/10'>
            <Film size={48} className='opacity-20 mb-4' />
            <p>
              {filteredMovies.length > 0
                ? 'Немає активних сеансів для обраних фільмів'
                : 'Фільмів з такими параметрами не знайдено'}
            </p>
            <button
              type='button'
              onClick={() => setActiveFilter('all')}
              className='mt-4 text-[var(--color-primary)] hover:underline'
            >
              Показати всі фільми
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8'>
            {moviesToShow.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                sessions={movie.sessions}
                technologies={movie.technologies}
              />
            ))}
          </div>
        )}
      </div>

      <PromoSection />
    </div>
  )
}

export default HomePage
