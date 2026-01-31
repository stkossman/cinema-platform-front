import { useState, useEffect } from 'react'
import HallBuilder from '../../features/admin/components/HallBuilder'
import { useHalls, useHallEditor } from './hooks/useHalls' // Імпортуємо хуки
import {
  Armchair,
  Trash2,
  Loader2,
  Plus,
  Users,
  MonitorPlay,
  Pencil,
} from 'lucide-react'

const HallsPage = () => {
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingHallId, setEditingHallId] = useState<string | null>(null)

  const { halls, isLoading, fetchHalls, deleteHall } = useHalls()
  const {
    initialSeats,
    isLoadingData: isLoadingEditData,
    isProcessing: isProcessingSeats,
    loadHallSeats,
    saveHall,
    resetEditor,
  } = useHallEditor(fetchHalls)

  useEffect(() => {
    fetchHalls()
  }, [fetchHalls])

  const handleEditClick = async (hallId: string) => {
    setEditingHallId(hallId)
    setMode('edit')
    const success = await loadHallSeats(hallId)
    if (!success) {
      alert('Помилка завантаження даних залу')
      setMode('list')
    }
  }

  const handleCreateClick = () => {
    setMode('create')
    setEditingHallId(null)
    resetEditor()
  }

  const handleBackToList = () => {
    setMode('list')
    setEditingHallId(null)
    resetEditor()
  }

  const onSaveClick = async (data: any) => {
    const promptMessage =
      mode === 'edit' ? 'Введіть нову назву залу:' : 'Введіть назву залу:'
    const currentName = halls.find(h => h.id === editingHallId)?.name || ''
    const hallName = prompt(promptMessage, mode === 'edit' ? currentName : '')

    if (!hallName) return

    const result = await saveHall(mode, editingHallId, hallName, data)

    if (result.success) {
      alert(mode === 'create' ? 'Зал успішно створено!' : 'Зал оновлено!')
      handleBackToList()
    } else {
      alert(`Помилка: ${result.error}`)
    }
  }

  const onDeleteClick = async (id: string) => {
    if (!confirm('Ви впевнені? Це видалить зал та всі його місця.')) return
    const success = await deleteHall(id)
    if (!success) alert('Не вдалося видалити зал.')
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Управління залами</h1>
          <p className='text-[var(--text-muted)] mt-1'>
            Створюйте схеми залів та керуйте місцями
          </p>
        </div>

        <button
          type='button'
          onClick={mode === 'list' ? handleCreateClick : handleBackToList}
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
            <HallBuilder
              onSave={onSaveClick}
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
            <div className='rounded-xl border border-dashed border-white/10 bg-[var(--bg-card)]/50 p-12 text-center text-[var(--text-muted)]'>
              <Armchair className='mx-auto h-12 w-12 mb-4 opacity-50' />
              Немає залів
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
                    <div className='rounded-lg bg-white/5 p-3 text-white group-hover:text-[var(--color-primary)] transition-colors'>
                      <MonitorPlay size={24} />
                    </div>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => handleEditClick(hall.id)}
                        className='rounded p-2 text-[var(--text-muted)] hover:bg-white/10 hover:text-white'
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        type='button'
                        onClick={() => onDeleteClick(hall.id)}
                        className='rounded p-2 text-[var(--text-muted)] hover:bg-[var(--color-error)]/10 hover:text-[var(--color-error)]'
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    {hall.name}
                  </h3>
                  <div className='flex items-center gap-2 text-[var(--text-muted)] text-sm'>
                    <Users size={16} />{' '}
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
