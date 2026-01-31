import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const registerSchema = z
  .object({
    firstName: z.string().min(2, "Ім'я занадто коротке"),
    lastName: z.string().min(2, 'Прізвище занадто коротке'),
    email: z
      .string()
      .min(1, 'Введіть email')
      .refine(val => val.includes('@'), 'Невірний формат email'),
    password: z.string().min(6, 'Пароль має бути мінімум 6 символів'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export const useRegister = () => {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      alert('Реєстрація успішна! Тепер увійдіть у свій акаунт.')
      navigate('/auth/login')
    } catch (error: any) {
      console.error(error)
      const message =
        error.response?.data?.title || error.message || 'Помилка реєстрації'
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, isSubmitting, onSubmit }
}
