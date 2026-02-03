import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { moviesService } from '../../../services/moviesService'
import { bookingService } from '../../../services/bookingService'
import type { Movie } from '../../../types/movie'

const AUTO_PLAY_INTERVAL = 8000

export const useHeroSlider = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<number | null>(null)
  const navigate = useNavigate()

  const fetchMoviesWithSessions = async () => {
    setIsLoading(true)
    try {
      const [allMovies, allSessions] = await Promise.all([
        moviesService.getAll(),
        bookingService.getAllSessions(),
      ])

      const now = new Date()
      const nextWeek = new Date()
      nextWeek.setDate(now.getDate() + 6)
      nextWeek.setHours(23, 59, 59, 999)

      const activeMovies = allMovies.filter(movie => {
        const movieSessions = allSessions.filter(s => s.movieId === movie.id)

        const hasUpcomingSession = movieSessions.some(session => {
          const sessionDate = new Date(session.startTime)
          return sessionDate >= now && sessionDate <= nextWeek
        })

        return hasUpcomingSession
      })

      setMovies(activeMovies.slice(0, 5))
    } catch (error) {
      console.error('Failed to load hero slider movies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMoviesWithSessions()
  }, [])

  const nextSlide = useCallback(() => {
    if (movies.length === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % movies.length)
      setIsAnimating(false)
    }, 500)
  }, [movies.length])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL)
  }, [nextSlide])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    startTimer()
  }, [startTimer])

  useEffect(() => {
    if (movies.length > 0) {
      startTimer()
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [movies.length, startTimer])

  const handleManualSelect = (index: number) => {
    if (index === currentIndex || isAnimating) return
    setIsAnimating(true)
    resetTimer()
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
    }, 300)
  }

  const handleBuyTicket = () => {
    if (movies[currentIndex]) {
      navigate(`/booking/${movies[currentIndex].id}`)
    }
  }

  return {
    movies,
    activeMovie: movies[currentIndex],
    currentIndex,
    isLoading,
    isAnimating,
    handleManualSelect,
    handleBuyTicket,
    AUTO_PLAY_INTERVAL,
  }
}
