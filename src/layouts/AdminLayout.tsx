import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Film,
  Calendar,
  Users,
  LogOut,
  Settings,
} from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Дашборд', href: '/admin' },
  { icon: Film, label: 'Фільми', href: '/admin/movies' },
  { icon: Calendar, label: 'Сеанси', href: '/admin/sessions' },
  { icon: Users, label: 'Користувачі', href: '/admin/users' },
  { icon: Settings, label: 'Налаштування', href: '/profile' },
]

const AdminLayout = () => {
  const { logout } = useAuth()
  const location = useLocation()

  return (
    <div className='flex min-h-screen bg-black text-zinc-100 selection:bg-red-500/30'>
      <aside className='fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-zinc-950'>
        <div className='flex h-16 items-center px-6 border-b border-white/10'>
          <Link to='/' className='text-xl font-bold tracking-tighter uppercase'>
            Cinema<span className='text-red-600'>.</span>{' '}
            <span className='text-xs text-zinc-500 ml-1'>Admin</span>
          </Link>
        </div>

        <nav className='flex flex-col gap-1 p-4'>
          {MENU_ITEMS.map(item => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/5'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className='absolute bottom-4 left-0 w-full px-4'>
          <button
            type='button'
            onClick={logout}
            className='flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10'
          >
            <LogOut size={18} />
            Вийти
          </button>
        </div>
      </aside>

      <main className='ml-64 flex-1 p-8'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
