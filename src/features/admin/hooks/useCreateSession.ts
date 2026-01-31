import { useState, useEffect } from 'react'
import { moviesService } from '../../../services/moviesService'
import { hallsService } from '../../../services/hallsService'
import {
  adminSessionsService,
  type PricingLookupDto,
} from '../../../services/adminSessionsService'
import type { Movie } from '../../../types/movie'

export const useCreateSession = (
  isOpen: boolean,
  onSuccess: () => void,
  onClose: () => void,
) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [halls, setHalls] = useState<any[]>([])
  const [pricings, setPricings] = useState<PricingLookupDto[]>([])

  const [movieId, setMovieId] = useState('')
  const [hallId, setHallId] = useState('')
  const [pricingId, setPricingId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setDate('')
      setTime('')
      loadData()
    }
  }, [isOpen])

  const loadData = async () => {
    setIsLoadingData(true)
    try {
      const [m, h, p] = await Promise.all([
        moviesService.getAll(),
        hallsService.getAll(),
        adminSessionsService.getPricingsLookup(),
      ])
      setMovies(m)
      setHalls(h)
      setPricings(p)
      if (m.length > 0) setMovieId(m[0].id)
      if (h.length > 0) setHallId(h[0].id)
      if (p.length > 0) setPricingId(p[0].id)
    } catch (e) {
      alert('Помилка завантаження даних')
    } finally {
      setIsLoadingData(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !movieId || !hallId || !pricingId) {
      alert('Заповніть всі поля')
      return
    }
    setIsSubmitting(true)
    try {
      const startDateTime = new Date(`${date}T${time}`)
      await adminSessionsService.create({
        movieId,
        hallId,
        pricingId,
        startTime: startDateTime.toISOString(),
      })
      onSuccess()
      onClose()
    } catch (error: any) {
      const msg =
        error.response?.data?.errors?.Description || error.message || 'Error'
      alert(`Помилка: ${msg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    movies,
    halls,
    pricings,
    movieId,
    setMovieId,
    hallId,
    setHallId,
    pricingId,
    setPricingId,
    date,
    setDate,
    time,
    setTime,
    isLoadingData,
    isSubmitting,
    submit,
  }
}
