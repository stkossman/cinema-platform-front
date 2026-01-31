import MoviesGrid from '../features/movies/components/MoviesGrid'

const MoviesPage = () => {
  return (
    <div className='min-h-screen bg-[var(--bg-main)] py-12'>
      <div className='container mx-auto px-4'>
        <div className='mb-10 animate-in fade-in slide-in-from-top-4 duration-500'>
          <h1 className='text-4xl font-black text-white uppercase tracking-tighter'>
            Всі{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-orange-500'>
              фільми
            </span>
          </h1>
          <p className='mt-2 text-lg text-[var(--text-muted)] max-w-2xl'>
            Обирайте серед найкращих кінострічок, доступних у наших залах.
            Використовуйте фільтри та бронюйте квитки онлайн.
          </p>
        </div>

        <div className='animate-in fade-in slide-in-from-bottom-8 duration-700'>
          <MoviesGrid />
        </div>
      </div>
    </div>
  )
}

export default MoviesPage
