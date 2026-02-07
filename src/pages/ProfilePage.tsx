import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
  Lock,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import TicketCard from '../features/profile/components/TicketCard'
import { useProfile, type TabType } from '../features/profile/hooks/useProfile'

const profileSchema = z
  .object({
    firstName: z.string().min(1, "Ім'я обов'язкове").max(50),
    lastName: z.string().min(1, "Прізвище обов'язкове").max(50),
    email: z.string().email(),

    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine(
    data => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.oldPassword && data.oldPassword.length > 0
      }
      return true
    },
    {
      message: 'Введіть поточний пароль для підтвердження змін',
      path: ['oldPassword'],
    },
  )
  .refine(
    data => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword === data.confirmNewPassword
      }
      return true
    },
    {
      message: 'Паролі не співпадають',
      path: ['confirmNewPassword'],
    },
  )
  .refine(
    data => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword.length >= 6
      }
      return true
    },
    {
      message: 'Мінімум 6 символів',
      path: ['newPassword'],
    },
  )

type ProfileFormData = z.infer<typeof profileSchema>

const ProfilePage = () => {
  const {
    user,
    logout,
    activeTab,
    setActiveTab,
    activeTickets,
    historyOrders,
    isLoadingTickets,
    isSaving,
    updateProfileData,
  } = useProfile()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.name || '',
        lastName: user.surname || '',
        email: user.email || '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data: ProfileFormData) => {
    const success = await updateProfileData(data)

    if (success) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      })
    }
  }

  if (!user) return null

  const initials = `${user.name[0]}${user.surname[0]}`.toUpperCase()

  return (
    <div className='container mx-auto max-w-5xl px-4 py-12 min-h-screen'>
      <div className='flex items-center gap-4 mb-8'>
        <div className='h-10 w-1 bg-[var(--color-primary)] rounded-full shadow-[0_0_20px_var(--color-primary)]'></div>
        <h1 className='text-3xl font-black text-white uppercase tracking-tight'>
          Особистий кабінет
        </h1>
      </div>

      <div className='grid gap-8 lg:grid-cols-[300px_1fr]'>
        <div className='space-y-6'>
          <div className='rounded-3xl border border-white/5 bg-[var(--bg-card)] p-8 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent pointer-events-none'></div>

            <div className='relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-zinc-800 to-black text-3xl font-black text-white ring-4 ring-[var(--bg-main)] shadow-xl'>
              {initials}
            </div>

            <h2 className='text-2xl font-bold text-white mb-1'>
              {user.name} {user.surname}
            </h2>
            <p className='text-sm font-medium text-[var(--text-muted)] bg-white/5 rounded-full py-1 px-3 inline-block border border-white/5'>
              {user.email}
            </p>

            {user.role === 'admin' && (
              <Link
                to='/admin'
                className='mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-lg'
              >
                <LayoutDashboard size={18} /> Адмін-панель
              </Link>
            )}

            <button
              type='button'
              onClick={() => logout()}
              className='mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/5 py-3 text-sm font-bold text-[var(--color-error)] transition-colors hover:bg-[var(--color-error)]/10'
            >
              <LogOut size={18} /> Вийти
            </button>
          </div>
        </div>

        <div>
          <div className='mb-8 flex p-1.5 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-md shadow-lg'>
            {(['active-tickets', 'history', 'settings'] as TabType[]).map(
              tab => (
                <button
                  key={tab}
                  type='button'
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    'flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl py-3 text-sm font-bold transition-all duration-300',
                    activeTab === tab
                      ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25 scale-100'
                      : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5 scale-95',
                  )}
                >
                  {tab === 'active-tickets' && <Ticket size={16} />}
                  {tab === 'history' && <History size={16} />}
                  {tab === 'settings' && <Settings size={16} />}
                  <span className='hidden sm:inline'>
                    {tab === 'active-tickets'
                      ? 'Активні квитки'
                      : tab === 'history'
                        ? 'Історія'
                        : 'Налаштування'}
                  </span>
                </button>
              ),
            )}
          </div>

          <div className='bg-[var(--bg-card)]/50 border border-white/5 rounded-3xl p-6 min-h-[400px] backdrop-blur-sm relative'>
            {activeTab === 'active-tickets' && (
              <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                {isLoadingTickets ? (
                  <div className='flex py-20 justify-center'>
                    <Loader2 className='animate-spin text-[var(--color-primary)] w-8 h-8' />
                  </div>
                ) : activeTickets.length > 0 ? (
                  activeTickets.map(ticket => (
                    <TicketCard key={ticket.id} order={ticket} />
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-20 text-center opacity-60'>
                    <div className='w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6'>
                      <Ticket className='h-10 w-10 text-[var(--text-muted)]' />
                    </div>
                    <h3 className='text-xl font-bold text-white'>
                      Активних квитків немає
                    </h3>
                    <Link
                      to='/'
                      className='mt-4 text-[var(--color-primary)] hover:underline'
                    >
                      Придбати квиток
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                {historyOrders.length > 0 ? (
                  historyOrders.map(order => (
                    <TicketCard key={order.id} order={order} isHistory />
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-20 text-center opacity-50'>
                    <History className='h-12 w-12 text-[var(--text-muted)] mb-4' />
                    <p className='font-medium text-white'>Історія порожня</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className='animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto py-4'>
                <div className='mb-8 flex items-center gap-3 border-b border-white/5 pb-6'>
                  <div className='p-3 bg-[var(--color-primary)]/10 rounded-xl'>
                    <User className='h-6 w-6 text-[var(--color-primary)]' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-white'>
                      Редагування профілю
                    </h3>
                    <p className='text-xs text-[var(--text-muted)]'>
                      Змініть ваші особисті дані та налаштування безпеки
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div className='grid gap-6 md:grid-cols-2'>
                    <Input
                      label="Ім'я"
                      error={errors.firstName?.message}
                      {...register('firstName')}
                    />
                    <Input
                      label='Прізвище'
                      error={errors.lastName?.message}
                      {...register('lastName')}
                    />
                  </div>
                  <Input
                    label='Email'
                    type='email'
                    disabled
                    className='opacity-60'
                    {...register('email')}
                  />

                  <div className='pt-8 border-t border-white/5'>
                    <h4 className='mb-6 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest flex items-center gap-2'>
                      <Lock size={14} /> Зміна паролю
                    </h4>

                    <div className='space-y-4 p-5 bg-white/[0.02] border border-white/5 rounded-xl'>
                      <Input
                        label='Поточний пароль'
                        type='password'
                        placeholder='Введіть поточний пароль'
                        error={errors.oldPassword?.message}
                        {...register('oldPassword')}
                      />
                      <div className='grid gap-4 md:grid-cols-2'>
                        <Input
                          label='Новий пароль'
                          type='password'
                          placeholder='••••••••'
                          error={errors.newPassword?.message}
                          {...register('newPassword')}
                        />
                        <Input
                          label='Підтвердження'
                          type='password'
                          placeholder='••••••••'
                          error={errors.confirmNewPassword?.message}
                          {...register('confirmNewPassword')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end pt-4'>
                    <button
                      type='submit'
                      disabled={isSaving}
                      className='flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed'
                    >
                      {isSaving ? (
                        <Loader2 className='h-4 w-4 animate-spin' />
                      ) : (
                        <Save className='h-4 w-4' />
                      )}
                      Зберегти зміни
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
