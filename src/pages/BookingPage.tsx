import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import type { Movie } from '../types/movie'
import type { Session, Hall, Seat } from '../types/hall'
import { moviesService } from '../services/moviesService'
import { bookingService } from '../services/bookingService'
import {
  Loader2,
  ArrowLeft,
  CheckCircle,
  Ticket,
  CalendarX,
} from 'lucide-react'

import SessionSelector from '../features/booking/components/SessionSelector'
import SeatSelector from '../features/booking/components/SeatSelector'
import { useAuth } from '../features/auth/AuthContext'

const BookingPage = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [hall, setHall] = useState<Hall | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    const init = async () => {
      if (!id) return
      try {
        const [movieData, sessionsData] = await Promise.all([
          moviesService.getById(id),
          bookingService.getSessionsByMovieId(id),
        ])
        setMovie(movieData)
        setSessions(sessionsData)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [id])

  useEffect(() => {
    if (selectedSession) {
      const loadHall = async () => {
        setIsLoading(true)
        const hallData = await bookingService.getHallById(
          selectedSession.hallId,
        )
        setHall(hallData)
        setIsLoading(false)
      }
      loadHall()
    }
  }, [selectedSession])

  const handleSeatToggle = (seat: Seat) => {
    const exists = selectedSeats.find(s => s.id === seat.id)
    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const handlePayment = () => {
    setIsProcessingPayment(true)
    setTimeout(() => {
      setIsProcessingPayment(false)
      setStep(3)
    }, 2000)
  }

  const handleChangeSession = () => {
    setStep(1)
    setSelectedSeats([])
    setSelectedSession(null)
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    const isVip = seat.seatTypeName?.toLowerCase().includes('vip')
    const price = isVip ? 300 : 150

    return sum + price
  }, 0)

  if (isLoading && !movie) {
    return (
      <div className='flex h-screen items-center justify-center bg-[var(--bg-main)] text-white'>
        <Loader2 className='animate-spin text-[var(--color-primary)]' />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className='flex h-screen flex-col items-center justify-center bg-[var(--bg-main)] px-4 text-center'>
        <CheckCircle className='mb-6 h-24 w-24 text-[var(--color-success)] animate-in zoom-in' />
        <h1 className='text-4xl font-bold text-white'>Оплата успішна!</h1>
        <p className='mt-4 text-[var(--text-muted)]'>
          Ваші квитки відправлено на пошту.
        </p>
        <Link
          to='/'
          className='mt-8 rounded-full bg-white px-8 py-3 font-bold text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
        >
          На головну
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]'>
      <header className='border-b border-white/5 bg-[var(--bg-card)] p-4'>
        <div className='container mx-auto flex items-center justify-between'>
          <Link
            to={`/movies/${id}`}
            className='flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors'
          >
            <ArrowLeft size={16} /> Назад до фільму
          </Link>
          <div className='text-sm font-medium'>Крок {step} з 2</div>
        </div>
      </header>

      <main className='container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_350px]'>
        <div>
          {step === 1 && (
            <div className='animate-in fade-in slide-in-from-left-4'>
              {sessions.length > 0 ? (
                <SessionSelector
                  sessions={sessions}
                  selectedSession={selectedSession}
                  onSelect={setSelectedSession}
                />
              ) : (
                <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[var(--bg-card)]/30 p-12 text-center'>
                  <div className='mb-4 rounded-full bg-white/5 p-4'>
                    <CalendarX className='h-8 w-8 text-[var(--text-muted)]' />
                  </div>
                  <h3 className='text-xl font-bold text-white'>
                    Сеансів поки немає
                  </h3>
                  <p className='mt-2 max-w-xs text-sm text-[var(--text-muted)]'>
                    На жаль, на цей фільм зараз немає запланованих сеансів. Будь
                    ласка, перевірте пізніше або оберіть інший фільм.
                  </p>
                  <Link
                    to='/movies'
                    className='mt-6 rounded-lg bg-[var(--color-primary)] px-6 py-2 text-sm font-bold text-white transition-all hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary)]/20'
                  >
                    Переглянути інші фільми
                  </Link>
                </div>
              )}
            </div>
          )}

          {step === 2 && hall && (
            <div className='animate-in fade-in slide-in-from-right-4'>
              <SeatSelector
                hall={hall}
                selectedSeats={selectedSeats}
                onToggleSeat={handleSeatToggle}
              />
            </div>
          )}
        </div>

        <div className='h-fit rounded-xl border border-white/5 bg-[var(--bg-card)] p-6 backdrop-blur-sm sticky top-24 shadow-2xl'>
          <h3 className='mb-4 text-lg font-bold text-white'>Ваше замовлення</h3>

          <div className='mb-6 flex gap-4 border-b border-white/5 pb-6'>
            <img
              src={movie?.backdropUrl}
              alt={movie?.title}
              className='h-20 w-14 rounded object-cover shadow-md'
            />
            <div>
              <div className='font-bold text-white line-clamp-1'>
                {movie?.title}
              </div>
              <div className='text-xs text-[var(--text-muted)]'>
                {movie?.year} • {movie?.genres[0]}
              </div>
            </div>
          </div>

          {selectedSession ? (
            <div className='mb-4 text-sm'>
              <div className='text-[var(--text-muted)]'>Сеанс:</div>
              <div className='text-white font-medium'>
                {new Date(selectedSession.startTime).toLocaleDateString()} о{' '}
                {new Date(selectedSession.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className='text-[var(--text-muted)] mt-2'>Зал:</div>
              <div className='text-white font-medium'>
                {selectedSession.hallName}
              </div>
            </div>
          ) : (
            <div className='mb-4 text-sm italic text-[var(--text-muted)] opacity-50'>
              Оберіть сеанс
            </div>
          )}

          {selectedSeats.length > 0 && (
            <div className='mb-6 border-t border-white/5 pt-4'>
              <div className='text-xs text-[var(--text-muted)] mb-2'>
                Обрані місця:
              </div>
              <div className='flex flex-wrap gap-2'>
                {selectedSeats.map(s => (
                  <span
                    key={s.id}
                    className='rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white'
                  >
                    Ряд {s.row} / {s.number}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className='mt-auto pt-4 border-t border-white/5'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-[var(--text-muted)]'>До сплати:</span>
              <span className='text-2xl font-bold text-white'>
                ₴ {totalPrice}
              </span>
            </div>

            {step === 1 ? (
              <button
                type='button'
                disabled={!selectedSession}
                onClick={() => setStep(2)}
                className='w-full rounded-lg bg-white py-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                Обрати місця
              </button>
            ) : (
              <button
                type='button'
                disabled={selectedSeats.length === 0 || isProcessingPayment}
                onClick={handlePayment}
                className='flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] py-3 font-bold text-white hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary)]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
              >
                {isProcessingPayment ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  <>
                    <Ticket size={18} /> Купити квитки
                  </>
                )}
              </button>
            )}

            {step === 2 && (
              <button
                type='button'
                onClick={handleChangeSession}
                className='w-full mt-2 py-2 text-sm text-[var(--text-muted)] hover:text-white transition-colors'
              >
                Змінити сеанс
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingPage
