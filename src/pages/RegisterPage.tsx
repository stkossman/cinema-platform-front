import { Link } from 'react-router-dom'
import Input from '../common/components/Input'
import { Loader2 } from 'lucide-react'
import { useRegister } from '../features/auth/hooks/useRegister'

const RegisterPage = () => {
  const { form, isSubmitting, onSubmit } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 bg-[var(--bg-main)]'>
      <div className='w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-[var(--bg-card)] p-8 backdrop-blur-xl shadow-2xl'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-white'>
            Створити акаунт
          </h2>
          <p className='mt-2 text-sm text-[var(--text-muted)]'>
            Приєднуйтесь до Cinema Community
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              label="Ім'я"
              placeholder='Андрій'
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label='Прізвище'
              placeholder='Шевченко'
              error={errors.lastName?.message}
              {...register('lastName')}
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
            className='mt-4 flex w-full items-center justify-center rounded-lg bg-white py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:opacity-70 shadow-lg'
          >
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Створити акаунт'
            )}
          </button>
        </form>

        <p className='text-center text-sm text-[var(--text-muted)]'>
          Вже є акаунт?{' '}
          <Link
            to='/auth/login'
            className='font-bold text-white hover:text-[var(--color-primary)] transition-colors'
          >
            Увійти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
