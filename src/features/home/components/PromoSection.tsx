import { TicketPercent, Sparkles, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'

const PromoSection = () => {
  const { user } = useAuth()

  return (
    <div className='w-full py-20 relative overflow-hidden'>
      <div className='container mx-auto px-4'>
        <div className='relative rounded-3xl bg-gradient-to-r from-[var(--bg-card)] to-[#0a0a0a] border border-white/5 px-6 py-12 md:px-16 md:py-20 shadow-2xl overflow-hidden group'>
          <div className='absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none'></div>
          <div className='absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none'></div>

          <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='md:w-1/2 space-y-6 text-center md:text-left'>
              <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold uppercase tracking-wider'>
                <Sparkles size={14} />
                Спеціальна пропозиція
              </div>

              <h2 className='text-3xl md:text-5xl font-black text-white leading-tight'>
                Вас очікують{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-orange-500'>
                  шалені знижки
                </span>
              </h2>

              <p className='text-lg text-[var(--text-muted)] max-w-lg mx-auto md:mx-0 leading-relaxed'>
                {user
                  ? 'Як учасник клубу, ви вже маєте доступ до ексклюзивних пропозицій. Перевірте свій кабінет, щоб не пропустити нові бонуси!'
                  : 'Реєструйся на платформі та отримуй доступ до закритих передпродажів, накопичуй бонуси за кожен квиток та отримуй попкорн у подарунок!'}
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2'>
                <Link
                  to={user ? '/offers' : '/auth/register'}
                  className='bg-[var(--color-primary)] text-white font-bold py-4 px-8 rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2'
                >
                  <TicketPercent size={20} />
                  {user ? 'До знижок' : 'Отримати знижку'}
                </Link>
                <Link
                  to='/offers'
                  className='px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 font-bold text-white transition-all flex items-center justify-center'
                >
                  Дізнатися більше
                </Link>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-center perspective-[1000px]'>
              <div className='relative w-80 h-52 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transform rotate-6 group-hover:rotate-3 transition-all duration-700 ease-out flex flex-col justify-between p-6 select-none hover:shadow-[0_0_50px_rgba(239,68,68,0.2)]'>
                <div className='flex justify-between items-start'>
                  <div>
                    <span className='block text-2xl font-black text-white tracking-widest italic'>
                      CINEMA
                    </span>
                    <span className='block text-xs font-bold text-[var(--color-primary)] tracking-[0.3em]'>
                      MEMBER CARD
                    </span>
                  </div>
                  <CreditCard className='text-white/20' size={32} />
                </div>

                <div className='w-12 h-9 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md shadow-inner flex items-center justify-center opacity-80'>
                  <div className='w-8 h-6 border border-black/10 rounded-sm'></div>
                </div>

                <div className='flex justify-between items-end'>
                  <div className='space-y-1'>
                    <div className='text-[10px] text-[var(--text-muted)] uppercase'>
                      Card Holder
                    </div>
                    <div className='text-sm font-bold text-white tracking-wider uppercase'>
                      {user ? `${user.name} ${user.surname}` : 'YOUR NAME'}
                    </div>
                  </div>
                  <span className='text-xl font-bold text-[var(--color-primary)]'>
                    VIP
                  </span>
                </div>

                <div className='absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 rounded-2xl pointer-events-none'></div>
              </div>

              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-[80px] -z-10'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoSection
