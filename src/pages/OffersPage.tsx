import { TicketPercent, Gift } from 'lucide-react'

const OffersPage = () => {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12'>
      <div className='relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-12 text-center backdrop-blur-xl'>
        <div className='absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-red-600/20 blur-[80px]' />
        <div className='absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-blue-600/10 blur-[80px]' />

        <div className='relative z-10 flex flex-col items-center'>
          <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-xl'>
            <TicketPercent className='h-10 w-10 text-yellow-500' />
          </div>

          <h1 className='mb-4 text-3xl font-bold text-white sm:text-4xl'>
            Персональні пропозиції
          </h1>

          <p className='mb-8 max-w-md text-lg text-zinc-400'>
            Ми готуємо для вас дещо особливе! Незабаром тут з'являться
            індивідуальні знижки та бонуси на основі ваших переглядів.
          </p>

          <div className='flex flex-wrap justify-center gap-4'>
            <div className='flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-zinc-300'>
              <Gift size={16} className='text-red-500' />
              Бонуси за квитки
            </div>
            <div className='flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-zinc-300'>
              <TicketPercent size={16} className='text-blue-500' />
              Знижки до Дня народження
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffersPage
