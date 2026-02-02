import { useState, useEffect } from 'react'
import { adminSessionsService } from '../../../services/adminSessionsService'
import { moviesService } from '../../../services/moviesService'
import { hallsService } from '../../../services/hallsService'
import {
  adminPricingsService,
  type PricingLookup,
} from '../../../services/adminPricingsService'
import type { Movie } from '../../../types/movie'
import type { HallSummaryDto } from '../../../services/hallsService'

export const useCreateSession = (
  isOpen: boolean,
  onSuccess: () => void,
  onClose: () => void,
) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [halls, setHalls] = useState<HallSummaryDto[]>([])
  const [pricings, setPricings] = useState<PricingLookup[]>([])

  const [movieId, setMovieId] = useState('')
  const [hallId, setHallId] = useState('')
  const [pricingId, setPricingId] = useState('')

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState('18:00')

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadData()
    }
  }, [isOpen])

  const loadData = async () => {
    setIsLoadingData(true)
    try {
      const [moviesData, hallsData, pricingsData] = await Promise.all([
        moviesService.getAll(),
        hallsService.getAll(),
        adminPricingsService.getLookups(),
      ])

      setMovies(moviesData)
      setHalls(hallsData)
      setPricings(pricingsData)

      if (moviesData.length > 0) setMovieId(moviesData[0].id)
      if (hallsData.length > 0) setHallId(hallsData[0].id)
      if (pricingsData.length > 0) setPricingId(pricingsData[0].id)
    } catch (error) {
      console.error('Failed to load session form data', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!movieId || !hallId || !pricingId || !date || !time) {
      alert('Будь ласка, заповніть всі поля')
      return
    }

    setIsSubmitting(true)
    try {
      const startDateTime = new Date(`${date}T${time}`)

      await adminSessionsService.create({
        movieId,
        hallId,
        startTime: startDateTime.toISOString(),
        pricingId,
      })

      onSuccess()
      onClose()
    } catch (error: any) {
      alert(error.response?.data?.error || 'Помилка створення сеансу')
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
