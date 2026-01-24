import { zodResolver } from '@hookform/resolvers/zod'
import { LayoutDashboard, Loader2, LogOut, Save, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'
import Input from '../common/components/Input'
import { useAuth } from '../features/auth/AuthContext'

const profileSchema = z.object({
  name: z.string().min(2, "Ім'я занадто коротке"),
  surname: z.string().min(2, 'Прізвище занадто коротке'),
  email: z.string().email('Невірний формат email'),
  newPassword: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

const ProfilePage = () => {
  const { user, updateUserData, logout } = useAuth()
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

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
    setSuccessMessage('')
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
      console.error('Failed to update profile', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  const initials = `${user.name[0]}${user.surname[0]}`.toUpperCase()

  return (
    <div className='container mx-auto max-w-4xl px-4 py-12'>
      <h1 className='mb-8 text-3xl font-bold text-white'>
        Налаштування профілю
      </h1>

      <div className='grid gap-8 md:grid-cols-[300px_1fr]'>
        <div className='h-fit rounded-2xl border border-white/10 bg-black/50 p-6 text-center backdrop-blur-xl'>
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
              Панель Адміністратора
            </Link>
          )}

          <button
            type='button'
            onClick={() => logout()}
            className='mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20'
          >
            <LogOut size={16} />
            Вийти з акаунту
          </button>
        </div>

        <div className='rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl'>
          <div className='mb-6 flex items-center gap-2 border-b border-white/5 pb-4'>
            <User className='h-5 w-5 text-zinc-400' />
            <h3 className='text-lg font-medium text-white'>Особисті дані</h3>
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
      </div>
    </div>
  )
}

export default ProfilePage
