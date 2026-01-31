import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../../features/auth/AuthContext'
import { clsx } from 'clsx'

const NAV_ITEMS = [
  { label: 'Фільми', href: '/movies' },
  { label: 'Знижки', href: '/offers' },
  { label: 'Допомога', href: '/faq' },
  { label: 'Про нас', href: '/about' },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b',
        isScrolled || isMobileMenuOpen
          ? 'glass-panel border-white/5 py-2'
          : 'bg-transparent border-transparent py-4',
      )}
    >
      <div className='container mx-auto flex items-center justify-between px-4'>
        <Link
          to='/'
          className='flex items-center gap-2 text-xl font-black tracking-tighter text-white uppercase select-none z-50 group'
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span>
            Cine<span className='text-[var(--color-primary)]'>ma</span>.
          </span>
        </Link>

        <nav className='hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-black/20 p-1 backdrop-blur-sm'>
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.label}
                to={item.href}
                className={clsx(
                  'px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300',
                  isActive
                    ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25'
                    : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='flex items-center gap-4'>
          {user ? (
            <div className='hidden md:flex items-center gap-4'>
              <Link
                to='/profile'
                className='flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--color-primary)] transition-colors'
              >
                <div className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10'>
                  <User size={14} />
                </div>
                <span className='hidden lg:inline'>{user.name}</span>
              </Link>
            </div>
          ) : (
            <Link
              to='/auth/login'
              className='hidden md:flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
            >
              Увійти
            </Link>
          )}

          <button
            type='button'
            className='block md:hidden text-white hover:text-[var(--color-primary)] transition-colors focus:outline-none'
            onClick={toggleMenu}
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'absolute top-full left-0 w-full border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl md:hidden overflow-hidden transition-all duration-500 ease-in-out',
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className='flex flex-col p-6 space-y-4'>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.label}
              to={item.href}
              className='text-xl font-bold text-[var(--text-muted)] hover:text-white hover:translate-x-2 transition-all duration-300'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className='h-px bg-white/10 my-4' />

          {user ? (
            <div className='flex flex-col gap-3'>
              <Link
                to='/profile'
                className='flex items-center justify-center gap-2 w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm font-bold text-white active:scale-95 transition-transform'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} />
                Мій кабінет ({user.name})
              </Link>
              <button
                type='button'
                onClick={handleLogout}
                className='flex items-center justify-center gap-2 w-full rounded-xl border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 px-5 py-3 text-sm font-bold text-[var(--color-error)] active:scale-95 transition-transform'
              >
                <LogOut size={18} />
                Вийти
              </button>
            </div>
          ) : (
            <Link
              to='/auth/login'
              className='w-full text-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition-transform active:scale-95 shadow-lg'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Увійти
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
