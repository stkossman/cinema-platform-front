import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { moviesService } from '../../../services/moviesService'
import { useAuth } from '../../auth/AuthContext'
import type { Movie } from '../../../types/movie'

const AUTO_PLAY_INTERVAL = 8000

export const useHeroSlider = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const timerRef = useRef<number | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const allMovies = await moviesService.getAll()
        if (allMovies.length > 0) {
          setMovies(allMovies.slice(0, 5))
        }
      } catch (error) {
        console.error('Failed to load hero movies', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    if (movies.length === 0) return
    startTimer()
    return () => stopTimer()
  }, [currentIndex, movies.length])

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      handleNext()
    }, AUTO_PLAY_INTERVAL)
  }

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % movies.length)
      setIsAnimating(false)
    }, 500)
  }

  const handleManualSelect = (index: number) => {
    if (index === currentIndex) return
    stopTimer()
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
      startTimer()
    }, 300)
  }

  const handleBuyTicket = () => {
    const activeMovie = movies[currentIndex]
    if (!activeMovie) return
    if (!user) navigate('/auth/login')
    else navigate(`/booking/${activeMovie.id}`)
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
