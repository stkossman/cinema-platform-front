import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../../features/auth/AuthContext'

const NAV_ITEMS = [
  { label: 'Фільми', href: '/movies' },
  { label: 'Знижки', href: '/offers' },
  { label: 'Допомога', href: '/faq' },
  { label: 'Про нас', href: '/about' },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link
          to='/'
          className='text-xl font-bold tracking-tighter text-white uppercase select-none z-50'
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cinema<span className='text-red-600'>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden gap-8 md:flex'>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.label}
              to={item.href}
              className='text-sm font-medium text-zinc-400 transition-colors hover:text-white'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User / Auth Actions */}
        <div className='flex items-center gap-4'>
          {user ? (
            <div className='flex items-center gap-4'>
              <Link
                to='/profile'
                className='hidden text-sm font-medium text-white hover:text-red-500 md:block'
              >
                {user.email}
              </Link>
            </div>
          ) : (
            <Link
              to='/auth/login'
              className='hidden md:block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95'
            >
              Увійти
            </Link>
          )}

          <button
            type='button'
            className='block md:hidden text-zinc-400 hover:text-white focus:outline-none'
            onClick={toggleMenu}
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 w-full border-b border-white/5 bg-black/95 backdrop-blur-xl md:hidden animate-in slide-in-from-top-5 fade-in duration-200'>
          <nav className='flex flex-col p-4 space-y-4'>
            {NAV_ITEMS.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className='text-lg font-medium text-zinc-400 hover:text-white transition-colors'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <hr className='border-white/5' />

            {user ? (
              <div className='flex flex-col gap-3 pt-2'>
                <div className='text-sm text-zinc-500 px-1'>Увійшов як:</div>
                <Link
                  to='/profile'
                  className='flex items-center justify-center gap-2 w-full rounded-lg bg-zinc-800 px-5 py-3 text-sm font-semibold text-white active:scale-95 transition-transform'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} />
                  {user.email}
                </Link>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='flex items-center justify-center gap-2 w-full rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-500 active:scale-95 transition-transform'
                >
                  <LogOut size={18} />
                  Вийти
                </button>
              </div>
            ) : (
              <Link
                to='/auth/login'
                className='w-full text-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform active:scale-95'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Увійти
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
