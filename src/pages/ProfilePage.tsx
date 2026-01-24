import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '../features/auth/AuthContext'
import Input from '../common/components/Input'
import {
  Loader2,
  User,
  Save,
  LogOut,
  LayoutDashboard,
  Ticket,
  History,
  Settings,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { type OrderItem } from '../types/order'
import TicketCard from '../features/profile/components/TicketCard'

const profileSchema = z.object({
  name: z.string().min(2, "Ім'я занадто коротке"),
  surname: z.string().min(2, 'Прізвище занадто коротке'),
  email: z.string().email('Невірний формат email'),
  newPassword: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

type TabType = 'settings' | 'active-tickets' | 'history'

const ProfilePage = () => {
  const { user, updateUserData, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<TabType>('active-tickets')

  const [activeTickets, setActiveTickets] = useState<OrderItem[]>([])
  const [historyOrders, setHistoryOrders] = useState<OrderItem[]>([])
  const [isLoadingTickets, setIsLoadingTickets] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    // TODO: fetch tickets from API
    setIsLoadingTickets(true)

    // api simulation
    const timer = setTimeout(() => {
      const mockActive: OrderItem[] = [
        {
          id: '1',
          movieTitle: 'Dune: Part Two',
          posterUrl:
            'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
          sessionDate: new Date().toISOString(),
          cinemaHall: 'Red Hall',
          seats: ['A-5', 'A-6'],
          totalPrice: 450,
          status: 'active',
          bookingId: 'xyz',
        },
      ]

      setActiveTickets(mockActive)
      setHistoryOrders([])

      setIsLoadingTickets(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      surname: user?.surname || '',
      email: user?.email || '',
      newPassword: '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true)
    try {
      const updatePayload = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        ...(data.newPassword ? { password: data.newPassword } : {}),
      }
      await updateUserData(updatePayload)
      setSuccessMessage('Профіль успішно оновлено!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  const initials = `${user.name[0]}${user.surname[0]}`.toUpperCase()

  return (
    <div className='container mx-auto max-w-5xl px-4 py-12'>
      <h1 className='mb-8 text-3xl font-bold text-white'>Особистий кабінет</h1>

      <div className='grid gap-8 lg:grid-cols-[300px_1fr]'>
        <div className='space-y-6'>
          <div className='rounded-2xl border border-white/10 bg-black/50 p-6 text-center backdrop-blur-xl'>
            <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-3xl font-bold text-white ring-4 ring-black'>
              {initials}
            </div>
            <h2 className='text-xl font-bold text-white'>
              {user.name} {user.surname}
            </h2>
            <p className='text-sm text-zinc-400'>{user.email}</p>

            {user.role === 'admin' && (
              <Link
                to='/admin'
                className='mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200'
              >
                <LayoutDashboard size={16} />
                Адмін-панель
              </Link>
            )}

            <button
              type='button'
              onClick={() => logout()}
              className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20'
            >
              <LogOut size={16} />
              Вийти
            </button>
          </div>
        </div>

        <div>
          <div className='mb-6 flex overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-1 backdrop-blur-xl'>
            <button
              type='button'
              onClick={() => setActiveTab('active-tickets')}
              className={clsx(
                'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium transition-all',
                activeTab === 'active-tickets'
                  ? 'bg-zinc-800 text-white shadow'
                  : 'text-zinc-400 hover:text-white',
              )}
            >
              <Ticket size={16} />
              Активні квитки
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('history')}
              className={clsx(
                'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium transition-all',
                activeTab === 'history'
                  ? 'bg-zinc-800 text-white shadow'
                  : 'text-zinc-400 hover:text-white',
              )}
            >
              <History size={16} />
              Історія замовлень
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('settings')}
              className={clsx(
                'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium transition-all',
                activeTab === 'settings'
                  ? 'bg-zinc-800 text-white shadow'
                  : 'text-zinc-400 hover:text-white',
              )}
            >
              <Settings size={16} />
              Налаштування
            </button>
          </div>

          {activeTab === 'active-tickets' && (
            <div className='space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300'>
              {isLoadingTickets ? (
                <div className='flex py-12 justify-center'>
                  <Loader2 className='animate-spin text-zinc-500' />
                </div>
              ) : activeTickets.length > 0 ? (
                activeTickets.map(ticket => (
                  <TicketCard key={ticket.id} order={ticket} />
                ))
              ) : (
                <div className='flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-zinc-900/30 py-16 text-center'>
                  <Ticket className='mb-4 h-12 w-12 text-zinc-600' />
                  <h3 className='text-lg font-medium text-white'>
                    У вас немає активних квитків
                  </h3>
                  <p className='text-sm text-zinc-500 max-w-xs mt-2'>
                    Схоже, ви ще не запланували похід у кіно. Перегляньте афішу!
                  </p>
                  <Link
                    to='/'
                    className='mt-6 rounded-full bg-white px-6 py-2 text-sm font-bold text-black hover:bg-zinc-200'
                  >
                    Вибрати фільм
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className='space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300'>
              {historyOrders.length > 0 ? (
                historyOrders.map(order => (
                  <TicketCard key={order.id} order={order} isHistory />
                ))
              ) : (
                <div className='rounded-2xl border border-white/5 bg-zinc-900/30 py-12 text-center text-zinc-500'>
                  Історія замовлень порожня
                </div>
              )}
            </div>
          )}
          {activeTab === 'settings' && (
            <div className='rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300'>
              <div className='mb-6 flex items-center gap-2 border-b border-white/5 pb-4'>
                <User className='h-5 w-5 text-zinc-400' />
                <h3 className='text-lg font-medium text-white'>
                  Особисті дані
                </h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <Input
                    label="Ім'я"
                    placeholder="Ваше ім'я"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label='Прізвище'
                    placeholder='Ваше прізвище'
                    error={errors.surname?.message}
                    {...register('surname')}
                  />
                </div>

                <Input
                  label='Email'
                  type='email'
                  placeholder='email@example.com'
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className='pt-4'>
                  <h4 className='mb-4 text-sm font-medium text-zinc-500 uppercase tracking-widest'>
                    Безпека
                  </h4>
                  <Input
                    label="Новий пароль (необов'язково)"
                    type='password'
                    placeholder='Залиште пустим, щоб не змінювати'
                    error={errors.newPassword?.message}
                    {...register('newPassword')}
                  />
                </div>

                {successMessage && (
                  <div className='rounded-lg bg-green-500/10 p-3 text-sm text-green-500 text-center animate-in fade-in'>
                    {successMessage}
                  </div>
                )}

                <div className='flex justify-end pt-2'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:opacity-70'
                  >
                    {isSubmitting ? (
                      <Loader2 className='h-4 w-4 animate-spin' />
                    ) : (
                      <>
                        <Save className='h-4 w-4' />
                        Зберегти зміни
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
