import HeroSection from '../features/movies/components/HeroSection'
import MoviesGrid from '../features/movies/components/MoviesGrid'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-10 pb-20'>
      <HeroSection />

      <div className='container mx-auto px-4'>
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-white sm:text-3xl'>
              Зараз у кіно
            </h2>
            <p className='mt-1 text-zinc-400'>
              Обирайте фільм та бронюйте найкращі місця
            </p>
          </div>
        </div>

        <MoviesGrid />
      </div>
    </div>
  )
}

export default HomePage
