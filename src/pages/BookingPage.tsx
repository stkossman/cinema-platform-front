import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Movie } from '../types/movie'
import type { Session, Hall, Seat } from '../types/hall'
import { moviesService } from '../services/moviesService'
import { bookingService } from '../services/bookingService'
import { Loader2, ArrowLeft, CheckCircle, Ticket } from 'lucide-react'

import SessionSelector from '../features/booking/components/SessionSelector'
import SeatSelector from '../features/booking/components/SeatSelector'

const BookingPage = () => {
  const { id } = useParams<{ id: string }>()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [hall, setHall] = useState<Hall | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

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
      <div className='flex h-screen items-center justify-center bg-zinc-950 text-white'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className='flex h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center'>
        <CheckCircle className='mb-6 h-24 w-24 text-green-500 animate-in zoom-in' />
        <h1 className='text-4xl font-bold text-white'>Оплата успішна!</h1>
        <p className='mt-4 text-zinc-400'>Ваші квитки відправлено на пошту.</p>
        <Link
          to='/'
          className='mt-8 rounded-full bg-white px-8 py-3 font-bold text-black hover:bg-zinc-200'
        >
          На головну
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-100'>
      <header className='border-b border-white/5 bg-black p-4'>
        <div className='container mx-auto flex items-center justify-between'>
          <Link
            to={`/movies/${id}`}
            className='flex items-center gap-2 text-sm text-zinc-400 hover:text-white'
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
              <SessionSelector
                sessions={sessions}
                selectedSession={selectedSession}
                onSelect={setSelectedSession}
              />
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

        <div className='h-fit rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm sticky top-24'>
          <h3 className='mb-4 text-lg font-bold text-white'>Ваше замовлення</h3>

          <div className='mb-6 flex gap-4 border-b border-white/5 pb-6'>
            <img
              src={movie?.backdropUrl}
              alt={movie?.title}
              className='h-20 w-14 rounded object-cover'
            />
            <div>
              <div className='font-bold text-white line-clamp-1'>
                {movie?.title}
              </div>
              <div className='text-xs text-zinc-400'>
                {movie?.year} • {movie?.genres[0]}
              </div>
            </div>
          </div>

          {selectedSession && (
            <div className='mb-4 text-sm'>
              <div className='text-zinc-500'>Сеанс:</div>
              <div className='text-white'>
                {new Date(selectedSession.startTime).toLocaleDateString()} о{' '}
                {new Date(selectedSession.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className='text-zinc-500 mt-2'>Зал:</div>
              <div className='text-white'>{selectedSession.hallName}</div>
            </div>
          )}

          {selectedSeats.length > 0 && (
            <div className='mb-6 border-t border-white/5 pt-4'>
              <div className='text-xs text-zinc-500 mb-2'>Обрані місця:</div>
              <div className='flex flex-wrap gap-2'>
                {selectedSeats.map(s => (
                  <span
                    key={s.id}
                    className='rounded bg-white/10 px-2 py-1 text-xs'
                  >
                    Ряд {s.row} / {s.number}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className='mt-auto pt-4 border-t border-white/10'>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-zinc-400'>До сплати:</span>
              <span className='text-2xl font-bold text-white'>
                ₴ {totalPrice}
              </span>
            </div>

            {step === 1 ? (
              <button
                type='button'
                disabled={!selectedSession}
                onClick={() => setStep(2)}
                className='w-full rounded-lg bg-white py-3 font-bold text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Обрати місця
              </button>
            ) : (
              <button
                type='button'
                disabled={selectedSeats.length === 0 || isProcessingPayment}
                onClick={handlePayment}
                className='flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed'
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
                className='w-full mt-2 py-2 text-sm text-zinc-400 hover:text-white'
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
