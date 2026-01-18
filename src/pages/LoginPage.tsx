import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import Input from '../common/components/Input'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      await login(data.email)
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>
            З поверненням
          </h2>
          <p className='mt-2 text-sm text-zinc-400'>
            Введіть свої дані для входу в акаунт
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <Input
            label='Email'
            type='email'
            placeholder='name@example.com'
            error={errors.email?.message}
            {...register('email')}
          />

          <div className='space-y-2'>
            <Input
              label='Пароль'
              type='password'
              placeholder='••••••••'
              error={errors.password?.message}
              {...register('password')}
            />
            <div className='flex justify-end'>
              <Link to='#' className='text-xs text-red-500 hover:text-red-400'>
                Забули пароль?
              </Link>
            </div>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='flex w-full items-center justify-center rounded-lg bg-white py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:opacity-70'
          >
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Увійти'
            )}
          </button>
        </form>

        <p className='text-center text-sm text-zinc-400'>
          Немає акаунту?{' '}
          <Link
            to='/auth/register'
            className='font-medium text-white hover:text-red-500 transition-colors'
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
