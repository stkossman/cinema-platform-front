import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Youtube,
  Apple,
  Play,
  Smartphone,
  Film,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-[#050505] border-t border-white/5 pt-20 pb-10 text-sm text-[var(--text-muted)] relative z-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16'>
          <div className='col-span-2 lg:col-span-2'>
            <Link
              to='/'
              className='flex items-center gap-2 text-2xl font-black tracking-tighter text-white uppercase mb-6'
            >
              <Film size={24} className='text-[var(--color-primary)]' />
              Cinema.
            </Link>
            <p className='text-zinc-500 mb-8 max-w-sm leading-relaxed'>
              Сучасна платформа для бронювання квитків. Ми створюємо найкращий
              досвід для кіноманів, поєднуючи зручність та інновації.
            </p>
            <div className='flex gap-4'>
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Youtube} />
            </div>
          </div>

          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>
              Кінотеатри
            </h4>
            <ul className='space-y-4'>
              {['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'].map(city => (
                <li key={city}>
                  <a
                    href='#'
                    className='hover:text-white transition-colors duration-200 block'
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs'>
              Інфо
            </h4>
            <ul className='space-y-4'>
              <li>
                <Link
                  to='/profile'
                  className='hover:text-white transition-colors duration-200 block'
                >
                  Особистий кабінет
                </Link>
              </li>
              <li>
                <Link
                  to='/faq'
                  className='hover:text-white transition-colors duration-200 block'
                >
                  Часті запитання
                </Link>
              </li>
              <li>
                <Link
                  to='/offers'
                  className='hover:text-white transition-colors duration-200 block'
                >
                  Акції
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='hover:text-white transition-colors duration-200 block'
                >
                  Про нас
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider text-xs flex items-center gap-2'>
              <Smartphone size={14} className='text-[var(--color-primary)]' />{' '}
              Мобільний додаток
            </h4>
            <div className='flex flex-col gap-3'>
              <AppButton icon={Apple} label='App Store' />
              <AppButton icon={Play} label='Google Play' />
            </div>
          </div>
        </div>

        <div className='border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600'>
          <div>
            © {new Date().getFullYear()} Cinema Platform. Powered by React.
          </div>
          <div className='flex gap-6'>
            <a href='#' className='hover:text-zinc-400'>
              Публічна оферта
            </a>
            <a href='#' className='hover:text-zinc-400'>
              Політика конфіденційності
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialIcon = ({ icon: Icon }: { icon: any }) => (
  <a
    href='#'
    className='p-3 rounded-full bg-white/5 border border-white/5 hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-all duration-300 group'
  >
    <Icon
      size={18}
      className='group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-white'
    />
  </a>
)

const AppButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button
    type='button'
    className='flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group w-full text-left active:scale-95'
  >
    <Icon
      size={20}
      className='text-zinc-400 group-hover:text-white transition-colors'
    />
    <div className='flex flex-col leading-none'>
      <span className='text-[9px] text-zinc-500 uppercase font-bold'>
        Завантажити з
      </span>
      <span className='text-xs font-bold text-white mt-1'>{label}</span>
    </div>
  </button>
)

export default Footer
