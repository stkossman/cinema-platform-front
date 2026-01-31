import { useState, useEffect } from 'react'
import HallBuilder from '../../features/admin/components/HallBuilder'
import { bookingService } from '../../services/bookingService'
import { hallsService, type HallSummaryDto } from '../../services/hallsService'
import {
  Armchair,
  Trash2,
  Loader2,
  Plus,
  Users,
  MonitorPlay,
  Pencil,
} from 'lucide-react'
import type { Seat } from '../../types/hall'

const HallsPage = () => {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [halls, setHalls] = useState<HallSummaryDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [editingHallId, setEditingHallId] = useState<string | null>(null)
  const [initialSeats, setInitialSeats] = useState<Seat[]>([])
  const [isLoadingEditData, setIsLoadingEditData] = useState(false)

  const [isProcessingSeats, setIsProcessingSeats] = useState(false)

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
      alert('Помилка завантаження даних залу')
      setMode('list')
    } finally {
      setIsLoadingEditData(false)
    }
  }

  const handleSaveHall = async (data: {
    rows: number
    cols: number
    technologyIds: string[]
    primarySeatTypeId: string
    seatConfig: { gridX: number; gridY: number; seatTypeId: string }[]
  }) => {
    const promptMessage =
      mode === 'edit' ? 'Введіть нову назву залу:' : 'Введіть назву залу:'
    const currentName = halls.find(h => h.id === editingHallId)?.name || ''
    const hallName = prompt(promptMessage, mode === 'edit' ? currentName : '')
    if (!hallName) return

    setIsProcessingSeats(true)

    try {
      let targetHallId = editingHallId

      if (mode === 'create') {
        const createResult = await hallsService.create(
          hallName,
          data.rows,
          data.cols,
          data.primarySeatTypeId,
          data.technologyIds,
        )
        targetHallId =
          typeof createResult === 'string'
            ? createResult
            : createResult.id || createResult.value

        alert('Зал створено. Застосовуємо типи місць...')
      } else if (mode === 'edit' && editingHallId) {
        await hallsService.update(editingHallId, hallName)
      }

      if (!targetHallId) throw new Error('Failed to resolve Hall ID')

      const currentHallState = await bookingService.getHallById(targetHallId!)

      const changesByType: Record<string, string[]> = {}

      currentHallState.seats.forEach(seat => {
        const targetConfig = data.seatConfig.find(
          sc => sc.gridX === seat.gridX && sc.gridY === seat.gridY,
        )

        if (targetConfig && targetConfig.seatTypeId !== seat.seatTypeId) {
          const typeId = targetConfig.seatTypeId
          if (!changesByType[typeId]) changesByType[typeId] = []
          changesByType[typeId].push(seat.id)
        }
      })

      const typeIdsToUpdate = Object.keys(changesByType)
      if (typeIdsToUpdate.length > 0) {
        const promises = typeIdsToUpdate.map(typeId => {
          return hallsService.batchChangeSeatType(
            targetHallId!,
            changesByType[typeId],
            typeId,
          )
        })
        await Promise.all(promises)
      }

      alert(
        mode === 'create'
          ? 'Зал успішно створено та налаштовано!'
          : 'Зал оновлено!',
      )

      setMode('list')
      setEditingHallId(null)
      fetchHalls()
    } catch (error: any) {
      const msg = error.response?.data?.errors
        ? JSON.stringify(error.response.data.errors)
        : error.message
      alert(`Помилка: ${msg}`)
    } finally {
      setIsProcessingSeats(false)
    }
  }

  const handleDeleteHall = async (id: string) => {
    if (!confirm('Ви впевнені? Це видалить зал та всі його місця.')) return
    try {
      await hallsService.delete(id)
      fetchHalls()
    } catch (error: any) {
      alert('Не вдалося видалити зал.')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Управління залами</h1>
          <p className='text-[var(--text-muted)] mt-1'>
            Створюйте схеми залів та керуйте місцями (API Generator)
          </p>
        </div>

        <button
          type='button'
          onClick={() => {
            setMode(mode === 'list' ? 'create' : 'list')
            setInitialSeats([])
          }}
          className={`rounded-xl px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 ${
            mode !== 'list'
              ? 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-white border border-white/10'
              : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary)]/20'
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

      {isProcessingSeats && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'>
          <div className='text-center'>
            <Loader2 className='h-12 w-12 animate-spin text-[var(--color-primary)] mx-auto mb-4' />
            <p className='text-white font-medium'>
              Застосування конфігурації місць...
            </p>
            <p className='text-zinc-400 text-sm'>
              Це може зайняти кілька секунд
            </p>
          </div>
        </div>
      )}

      {mode !== 'list' ? (
        isLoadingEditData ? (
          <div className='flex justify-center py-20'>
            <Loader2 className='h-8 w-8 animate-spin text-[var(--color-primary)]' />
          </div>
        ) : (
          <div className='animate-in fade-in slide-in-from-top-4'>
            <h2 className='text-xl font-bold text-white mb-4'>
              {mode === 'edit' ? 'Редагування залу' : 'Створення нового залу'}
            </h2>
            {mode === 'edit' && (
              <div className='mb-4 p-4 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-white text-sm rounded-lg flex items-center gap-2'>
                <MonitorPlay
                  size={16}
                  className='text-[var(--color-primary)]'
                />
                <span>
                  <strong>Режим редагування:</strong> Ви можете змінювати назву
                  та перефарбовувати типи місць. Розміри залу змінити не можна.
                </span>
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
              <Loader2 className='h-8 w-8 animate-spin text-[var(--color-primary)]' />
            </div>
          )}

          {!isLoading && halls.length === 0 && (
            <div className='rounded-xl border border-dashed border-white/10 bg-[var(--bg-card)]/50 p-12 text-center'>
              <Armchair className='mx-auto h-12 w-12 text-[var(--text-muted)] mb-4' />
              <h3 className='text-xl font-medium text-white'>Немає залів</h3>
              <p className='text-[var(--text-muted)] mt-2'>
                Створіть свій перший зал.
              </p>
            </div>
          )}

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {halls.map(hall => (
              <div
                key={hall.id}
                className='group relative overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg'
              >
                <div className='p-6'>
                  <div className='flex items-start justify-between mb-6'>
                    <div className='rounded-lg bg-white/5 p-3 text-white border border-white/5 group-hover:border-[var(--color-primary)]/30 group-hover:text-[var(--color-primary)] transition-colors'>
                      <MonitorPlay size={24} />
                    </div>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => handleEditClick(hall.id)}
                        className='rounded p-2 text-[var(--text-muted)] hover:bg-white/10 hover:text-white transition-colors'
                        title='Редагувати'
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type='button'
                        onClick={() => handleDeleteHall(hall.id)}
                        className='rounded p-2 text-[var(--text-muted)] hover:bg-[var(--color-error)]/10 hover:text-[var(--color-error)] transition-colors'
                        title='Видалити'
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <h3 className='text-xl font-bold text-white mb-2'>
                    {hall.name}
                  </h3>

                  <div className='flex items-center gap-2 text-[var(--text-muted)] text-sm'>
                    <Users size={16} />
                    <span>
                      Місць:{' '}
                      <span className='text-white font-medium'>
                        {hall.capacity}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default HallsPage
