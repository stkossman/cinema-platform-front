import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import HallBuilder from '../../features/admin/components/HallBuilder'
import { type Seat } from '../../types/hall'
import { bookingService } from '../../services/bookingService'
import { hallsService } from '../../services/hallsService'
import {
  Armchair,
  Trash2,
  Loader2,
  Plus,
  Users,
  MonitorPlay,
  Pencil,
} from 'lucide-react'

interface HallSummary {
  id: string
  name: string
  capacity: number
}

const HallsPage = () => {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [halls, setHalls] = useState<HallSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [editingHallId, setEditingHallId] = useState<string | null>(null)
  const [initialSeats, setInitialSeats] = useState<Seat[]>([])
  const [isLoadingEditData, setIsLoadingEditData] = useState(false)

  const fetchHalls = async () => {
    setIsLoading(true)
    try {
      const data = await hallsService.getAll()
      setHalls(data)
    } catch (error) {
      console.error('Error fetching halls:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHalls()
  }, [])

  const handleEditClick = async (hallId: string) => {
    setIsLoadingEditData(true)
    setEditingHallId(hallId)
    setMode('edit')

    try {
      const hallData = await bookingService.getHallById(hallId)
      setInitialSeats(hallData.seats)
    } catch (error) {
      console.error('Failed to load hall data', error)
      alert('Помилка завантаження даних залу')
      setMode('list')
    } finally {
      setIsLoadingEditData(false)
    }
  }

  const handleSaveHall = async (data: {
    rows: number
    cols: number
    seats: Seat[]
    technologyIds: string[]
    primarySeatTypeId: string
  }) => {
    const promptMessage =
      mode === 'edit'
        ? 'Введіть нову назву залу (Схема місць НЕ зміниться):'
        : "Введіть назву залу (напр. 'Red Hall'):"

    const currentName = halls.find(h => h.id === editingHallId)?.name || ''

    const hallName = prompt(promptMessage, mode === 'edit' ? currentName : '')

    if (!hallName) return

    try {
      if (mode === 'create') {
        await hallsService.create(
          hallName,
          data.rows,
          data.cols,
          data.primarySeatTypeId,
          data.technologyIds,
        )
        alert('Зал успішно створено!')
      } else if (mode === 'edit' && editingHallId) {
        await hallsService.update(editingHallId, hallName)
        alert(
          'Назву залу оновлено! (Зміна місць і технологій наразі не підтримується)',
        )
      }

      setMode('list')
      setEditingHallId(null)
      fetchHalls()
    } catch (error: any) {
      console.error('Error saving hall:', error)
      const msg = error.response?.data?.errors
        ? JSON.stringify(error.response.data.errors)
        : error.message || 'Unknown error'
      alert(`Помилка при збереженні: ${msg}`)
    }
  }

  const handleDeleteHall = async (id: string) => {
    if (!confirm('Ви впевнені? Це видалить зал та всі його місця.')) return
    try {
      await hallsService.delete(id)
      fetchHalls()
    } catch (error: any) {
      console.error('Error deleting hall:', error)
      alert("Не вдалося видалити зал. Можливо, є пов'язані сеанси.")
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Управління залами</h1>
          <p className='text-zinc-400 mt-1'>
            Створюйте схеми залів та керуйте місцями (Local API)
          </p>
        </div>

        <button
          type='button'
          onClick={() => {
            if (mode === 'list') {
              setMode('create')
              setInitialSeats([])
            } else {
              setMode('list')
            }
          }}
          className={`rounded-xl px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 ${
            mode !== 'list'
              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
              : 'bg-white text-black hover:bg-zinc-200'
          }`}
        >
          {mode !== 'list' ? (
            'Скасувати'
          ) : (
            <>
              <Plus size={18} /> Створити новий зал
            </>
          )}
        </button>
      </div>

      {mode !== 'list' ? (
        isLoadingEditData ? (
          <div className='flex justify-center py-20'>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-600' />
          </div>
        ) : (
          <div className='animate-in fade-in slide-in-from-top-4'>
            <h2 className='text-xl font-bold text-white mb-4'>
              {mode === 'edit' ? 'Редагування залу' : 'Створення нового залу'}
            </h2>
            {mode === 'edit' && (
              <div className='mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm rounded-lg'>
                Увага: Наразі режим редагування дозволяє змінювати лише{' '}
                <strong>назву</strong> залу. Зміни у розстановці крісел чи
                технологій не будуть збережені.
              </div>
            )}
            <HallBuilder
              onSave={handleSaveHall}
              initialSeats={initialSeats}
              isEditing={mode === 'edit'}
            />
          </div>
        )
      ) : (
        <>
          {isLoading && (
            <div className='flex justify-center py-20'>
              <Loader2 className='h-8 w-8 animate-spin text-zinc-600' />
            </div>
          )}

          {!isLoading && halls.length === 0 && (
            <div className='rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center'>
              <Armchair className='mx-auto h-12 w-12 text-zinc-700 mb-4' />
              <h3 className='text-xl font-medium text-white'>Немає залів</h3>
              <p className='text-zinc-500 mt-2'>
                Створіть свій перший зал, щоб почати планувати сеанси.
              </p>
            </div>
          )}

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {halls.map(hall => (
              <div
                key={hall.id}
                className='group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-all hover:border-white/20 hover:bg-zinc-900/80'
              >
                <div className='p-6'>
                  <div className='flex items-start justify-between mb-6'>
                    <div className='rounded-lg bg-zinc-800 p-3 text-white'>
                      <MonitorPlay size={24} />
                    </div>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => handleEditClick(hall.id)}
                        className='rounded p-2 text-zinc-500 hover:bg-white/10 hover:text-white transition-colors'
                        title='Редагувати назву'
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type='button'
                        onClick={() => handleDeleteHall(hall.id)}
                        className='rounded p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-colors'
                        title='Видалити зал'
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <h3 className='text-xl font-bold text-white mb-2'>
                    {hall.name}
                  </h3>

                  <div className='flex items-center gap-2 text-zinc-400 text-sm'>
                    <Users size={16} />
                    <span>
                      Місць:{' '}
                      <span className='text-white font-medium'>
                        {hall.capacity}
                      </span>
                    </span>
                  </div>
                </div>

                <div className='absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none' />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HallsPage
