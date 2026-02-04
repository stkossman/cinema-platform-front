import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { moviesService } from '../../../services/moviesService'
import { type Movie, MovieStatus } from '../../../types/movie'

const AUTO_PLAY_INTERVAL = 8000

export const useHeroSlider = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<number | null>(null)
  const navigate = useNavigate()

  const fetchHeroMovies = async () => {
    setIsLoading(true)
    try {
      const allMovies = await moviesService.getAll()

      const activeMovies = allMovies
        .filter(m => m.status === MovieStatus.Active)
        .slice(0, 5)

      setMovies(activeMovies)
    } catch (error) {
      console.error('Failed to load hero slider movies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHeroMovies()
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
