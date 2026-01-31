import { TicketPercent, Gift, Zap, Crown } from 'lucide-react'

const OffersPage = () => {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20 bg-[var(--bg-main)] overflow-hidden relative'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-[120px] animate-pulse-slow' />
        <div className='absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px]' />
      </div>

      <div className='relative w-full max-w-4xl z-10'>
        <div className='text-center mb-16 space-y-4'>
          <h1 className='text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase'>
            Ексклюзивні{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-orange-500'>
              Пропозиції
            </span>
          </h1>
          <p className='text-lg text-[var(--text-muted)] max-w-xl mx-auto'>
            Приєднуйтесь до програми лояльності, щоб отримати доступ до
            спеціальних цін та закритих показів.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg-card)] p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--color-primary)]/30'>
            <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity'>
              <TicketPercent size={120} />
            </div>
            <div className='w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-[var(--color-primary)] border border-white/10 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors'>
              <Zap size={24} />
            </div>
            <h3 className='text-2xl font-bold text-white mb-2'>Ранні пташки</h3>
            <p className='text-[var(--text-muted)] mb-6'>
              Знижка 20% на всі ранкові сеанси до 12:00 у будні дні.
            </p>
            <button
              type='button'
              className='w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white hover:text-black transition-all'
            >
              Скоро
            </button>
          </div>

          <div className='group relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg-card)] p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/30'>
            <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity'>
              <Gift size={120} />
            </div>
            <div className='w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-blue-500 border border-white/10 group-hover:bg-blue-500 group-hover:text-white transition-colors'>
              <Crown size={24} />
            </div>
            <h3 className='text-2xl font-bold text-white mb-2'>
              Birthday Special
            </h3>
            <p className='text-[var(--text-muted)] mb-6'>
              Безкоштовний квиток та попкорн у ваш день народження для учасників
              клубу.
            </p>
            <button
              type='button'
              className='w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-blue-500 hover:border-blue-500 transition-all'
            >
              Скоро
            </button>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[var(--text-muted)]'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]'></span>
            </span>
            Більше пропозицій вже в розробці
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffersPage
