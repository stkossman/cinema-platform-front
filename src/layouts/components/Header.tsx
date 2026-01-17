import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Розклад', href: '/' },
  { label: 'Фільми', href: '/' },
  { label: 'Новини', href: '/' },
  { label: 'Про нас', href: '/about' },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

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

        <div className='flex items-center gap-4'>
          <Link
            to='/auth/login'
            className='hidden md:block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95'
          >
            Увійти
          </Link>

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
            <Link
              to='/auth/login'
              className='w-full text-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-transform active:scale-95'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Увійти
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
