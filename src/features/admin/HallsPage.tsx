import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import HallBuilder from '../../features/admin/components/HallBuilder'
import { type Seat } from '../../types/hall'
import {
  Armchair,
  Trash2,
  Loader2,
  Plus,
  Users,
  MonitorPlay,
} from 'lucide-react'

interface HallSummary {
  id: string
  name: string
  total_capacity: number
}

const HallsPage = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [halls, setHalls] = useState<HallSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchHalls = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('halls')
        .select('id, name, total_capacity')
        .order('name', { ascending: true })

      if (error) throw error
      setHalls(data || [])
    } catch (error) {
      console.error('Error fetching halls:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHalls()
  }, [])

  const handleSaveHall = async (data: {
    rows: number
    cols: number
    seats: Seat[]
  }) => {
    const hallName = prompt("Введіть назву залу (напр. 'Red Hall'):")
    if (!hallName) return

    try {
      const newHallId = crypto.randomUUID()

      const { error: hallError } = await supabase.from('halls').insert({
        id: newHallId,
        name: hallName,
        total_capacity: data.seats.length,
      })

      if (hallError) throw hallError

      const seatsToInsert = data.seats.map(s => ({
        id: crypto.randomUUID(),
        hall_id: newHallId,
        row_label: s.row,
        number: s.number,
        grid_x: s.gridX,
        grid_y: s.gridY,
        seat_type_id: s.seatTypeId,
        status: 0,
      }))

      const { error: seatsError } = await supabase
        .from('seats')
        .insert(seatsToInsert)

      if (seatsError) throw seatsError

      alert('Зал успішно створено!')
      setIsCreating(false)
      fetchHalls()
    } catch (error: any) {
      console.error('Error saving hall:', error)
      alert(`Помилка при збереженні: ${error.message}`)
    }
  }

  const handleDeleteHall = async (id: string) => {
    if (!confirm('Ви впевнені? Це видалить зал та всі його місця.')) return

    try {
      const { error } = await supabase.from('halls').delete().eq('id', id)

      if (error) throw error

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
            Створюйте схеми залів та керуйте місцями
          </p>
        </div>

        <button
          type='button'
          onClick={() => setIsCreating(!isCreating)}
          className={`rounded-xl px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 ${
            isCreating
              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
              : 'bg-white text-black hover:bg-zinc-200'
          }`}
        >
          {isCreating ? (
            'Скасувати'
          ) : (
            <>
              <Plus size={18} /> Створити новий зал
            </>
          )}
        </button>
      </div>

      {isCreating ? (
        <div className='animate-in fade-in slide-in-from-top-4'>
          <HallBuilder onSave={handleSaveHall} />
        </div>
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
                    <button
                      type='button'
                      onClick={() => handleDeleteHall(hall.id)}
                      className='rounded p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-colors'
                      title='Видалити зал'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <h3 className='text-xl font-bold text-white mb-2'>
                    {hall.name}
                  </h3>

                  <div className='flex items-center gap-2 text-zinc-400 text-sm'>
                    <Users size={16} />
                    <span>
                      Місць:{' '}
                      <span className='text-white font-medium'>
                        {hall.total_capacity}
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
