import HeroSection from '../features/movies/components/HeroSection'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-10 pb-20'>
      <HeroSection />

      <div className='container mx-auto px-4'>
        <h2 className='mb-6 text-2xl font-bold text-white'>Зараз у кіно</h2>
        <div className='grid h-64 w-full place-items-center rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 text-zinc-500'>
          Тут буде список фільмів (Grid)
        </div>
      </div>
    </div>
  )
}

export default HomePage
