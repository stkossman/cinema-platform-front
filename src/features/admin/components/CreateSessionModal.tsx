import { useState, useEffect } from 'react'
import {
  X,
  Loader2,
  Calendar,
  Clock,
  DollarSign,
  Film,
  MonitorPlay,
} from 'lucide-react'
import { moviesService } from '../../../services/moviesService'
import { hallsService } from '../../../services/hallsService'
import {
  adminSessionsService,
  type PricingLookupDto,
} from '../../../services/adminSessionsService'
import type { Movie } from '../../../types/movie'

interface CreateSessionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const CreateSessionModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateSessionModalProps) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [halls, setHalls] = useState<any[]>([])
  const [pricings, setPricings] = useState<PricingLookupDto[]>([])

  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [movieId, setMovieId] = useState('')
  const [hallId, setHallId] = useState('')
  const [pricingId, setPricingId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadData()
      setDate('')
      setTime('')
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
      console.error(e)
      alert('Помилка завантаження даних (фільми/зали/ціни)')
    } finally {
      setIsLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !movieId || !hallId || !pricingId) {
      alert('Будь ласка, заповніть всі поля')
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
      console.error(error)
      const msg =
        error.response?.data?.errors?.Description ||
        error.message ||
        'Unknown error'
      alert(`Не вдалося створити сеанс: ${msg}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
      <div className='w-full max-w-lg rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200'>
        <div className='flex items-center justify-between mb-6 border-b border-white/5 pb-4'>
          <h2 className='text-xl font-bold text-white'>Додати сеанс</h2>
          <button
            onClick={onClose}
            className='text-zinc-400 hover:text-white transition-colors'
          >
            <X size={24} />
          </button>
        </div>

        {isLoadingData ? (
          <div className='py-12 flex justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-2'>
                <Film size={14} /> Фільм
              </label>
              <select
                value={movieId}
                onChange={e => setMovieId(e.target.value)}
                className='w-full rounded-lg bg-black border border-white/10 p-3 text-white focus:border-white focus:ring-1 focus:ring-white transition-all appearance-none cursor-pointer hover:bg-zinc-950'
              >
                {movies.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.duration} хв)
                  </option>
                ))}
              </select>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-2'>
                  <MonitorPlay size={14} /> Зал
                </label>
                <select
                  value={hallId}
                  onChange={e => setHallId(e.target.value)}
                  className='w-full rounded-lg bg-black border border-white/10 p-3 text-white focus:border-white focus:ring-1 focus:ring-white transition-all appearance-none cursor-pointer hover:bg-zinc-950'
                >
                  {halls.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-2'>
                  <DollarSign size={14} /> Тариф
                </label>
                <select
                  value={pricingId}
                  onChange={e => setPricingId(e.target.value)}
                  className='w-full rounded-lg bg-black border border-white/10 p-3 text-white focus:border-white focus:ring-1 focus:ring-white transition-all appearance-none cursor-pointer hover:bg-zinc-950'
                >
                  {pricings.length === 0 && (
                    <option disabled>Немає тарифів</option>
                  )}
                  {pricings.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-2'>
                  <Calendar size={14} /> Дата
                </label>
                <input
                  type='date'
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className='w-full rounded-lg bg-black border border-white/10 p-3 text-white focus:border-white [color-scheme:dark]'
                  min={new Date().toISOString().split('T')[0]} // Block past dates
                />
              </div>
              <div>
                <label className='text-xs font-medium text-zinc-400 mb-1.5 flex items-center gap-2'>
                  <Clock size={14} /> Час початку
                </label>
                <input
                  type='time'
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className='w-full rounded-lg bg-black border border-white/10 p-3 text-white focus:border-white [color-scheme:dark]'
                />
              </div>
            </div>

            <div className='pt-4 flex justify-end gap-3 border-t border-white/5 mt-6'>
              <button
                type='button'
                onClick={onClose}
                className='px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors'
              >
                Скасувати
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-white text-black text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-colors'
              >
                {isSubmitting ? (
                  <Loader2 size={16} className='animate-spin' />
                ) : (
                  <Calendar size={16} />
                )}
                {isSubmitting ? 'Створення...' : 'Запланувати'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CreateSessionModal
