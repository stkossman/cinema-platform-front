import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import Input from '../common/components/Input'
import { Loader2 } from 'lucide-react'

const registerSchema = z
  .object({
    name: z.string().min(2, "Ім'я занадто коротке"),
    surname: z.string().min(2, 'Прізвище занадто коротке'),
    email: z.string().email('Невірний формат email'),
    password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    try {
      await registerUser(data.email, data.name, data.surname)
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
            Створити акаунт
          </h2>
          <p className='mt-2 text-sm text-zinc-400'>
            Приєднуйтесь до Cinema Community
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              label="Ім'я"
              placeholder='Андрій'
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label='Прізвище'
              placeholder='Шевченко'
              error={errors.surname?.message}
              {...register('surname')}
            />
          </div>

          <Input
            label='Email'
            type='email'
            placeholder='name@example.com'
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label='Пароль'
            type='password'
            placeholder='••••••••'
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label='Підтвердження'
            type='password'
            placeholder='••••••••'
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-4 flex w-full items-center justify-center rounded-lg bg-white py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:opacity-70'
          >
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Створити акаунт'
            )}
          </button>
        </form>

        <p className='text-center text-sm text-zinc-400'>
          Вже є акаунт?{' '}
          <Link
            to='/auth/login'
            className='font-medium text-white hover:text-red-500 transition-colors'
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
