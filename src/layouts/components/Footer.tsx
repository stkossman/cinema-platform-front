import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Youtube,
  Apple,
  Play,
  Smartphone,
} from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-[var(--bg-main)] border-t border-white/5 pt-16 pb-8 text-sm text-[var(--text-muted)]'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12'>
          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2'>
              Кінотеатри
            </h4>
            <ul className='space-y-3'>
              {['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'].map(city => (
                <li key={city}>
                  <a
                    href='#'
                    className='hover:text-[var(--color-primary)] transition-colors duration-200'
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider'>
              Користувачу
            </h4>
            <ul className='space-y-3'>
              <li>
                <Link
                  to='/profile'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Особистий кабінет
                </Link>
              </li>
              <li>
                <Link
                  to='/faq'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Часті запитання
                </Link>
              </li>
              <li>
                <a
                  href='faq'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Повернення квитків
                </a>
              </li>
              <li>
                <a
                  href='about'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Контакти
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider'>
              Про нас
            </h4>
            <ul className='space-y-3'>
              <li>
                <a
                  href='#'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Новини
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Вакансії
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Реклама
                </a>
              </li>
              <li>
                <Link
                  to='/about'
                  className='hover:text-[var(--color-primary)] transition-colors duration-200'
                >
                  Про компанію
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2'>
              <Smartphone size={16} className='text-[var(--color-primary)]' />{' '}
              Додаток
            </h4>
            <p className='mb-4 text-xs leading-relaxed opacity-80'>
              Купуй квитки в один клік та зберігай їх у смартфоні.
            </p>
            <div className='flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row'>
              <button
                type='button'
                className='flex items-center justify-center gap-2 h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group w-full sm:w-auto'
              >
                <Apple
                  size={18}
                  className='text-white group-hover:text-[var(--color-primary)] transition-colors'
                />
                <span className='text-xs font-bold text-white'>App Store</span>
              </button>
              <button
                type='button'
                className='flex items-center justify-center gap-2 h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group w-full sm:w-auto'
              >
                <Play
                  size={18}
                  className='text-white group-hover:text-[var(--color-primary)] transition-colors'
                />
                <span className='text-xs font-bold text-white'>
                  Google Play
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className='border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='text-xs opacity-60'>
            © {new Date().getFullYear()} Cinema Platform. Всі права захищено.
          </div>

          <div className='flex gap-4'>
            <a
              href='#'
              className='p-2 rounded-full bg-white/5 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300'
            >
              <Instagram size={18} />
            </a>
            <a
              href='#'
              className='p-2 rounded-full bg-white/5 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300'
            >
              <Facebook size={18} />
            </a>
            <a
              href='#'
              className='p-2 rounded-full bg-white/5 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300'
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
