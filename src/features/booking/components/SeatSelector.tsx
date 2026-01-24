import type { Hall, Seat } from '../../../types/hall'
import { SEAT_TYPES } from '../../../common/constants/seatTypes'
import { clsx } from 'clsx'
import { Armchair } from 'lucide-react'

interface SeatSelectorProps {
  hall: Hall
  selectedSeats: Seat[]
  onToggleSeat: (seat: Seat) => void
}

const SeatSelector = ({
  hall,
  selectedSeats,
  onToggleSeat,
}: SeatSelectorProps) => {
  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold text-white'>Оберіть місця</h2>

      <div className='flex gap-4 text-xs text-zinc-400'>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded bg-zinc-800 border border-zinc-700' />{' '}
          Вільно
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded bg-white' /> Обрано
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 w-4 rounded bg-zinc-900 opacity-30' /> Зайнято
        </div>
        {Object.values(SEAT_TYPES).map(t => (
          <div key={t.id} className='flex items-center gap-2'>
            <div className={`h-4 w-4 rounded ${t.color}`} /> {t.name}
          </div>
        ))}
      </div>

      <div className='relative w-full overflow-x-auto rounded-xl border border-white/10 bg-black p-8'>
        <div className='mx-auto mb-8 w-2/3'>
          <div className='h-2 w-full rounded-full bg-gradient-to-r from-zinc-800 via-white/20 to-zinc-800 shadow-[0_10px_30px_rgba(255,255,255,0.1)]' />
          <p className='mt-2 text-center text-xs tracking-widest text-zinc-500 uppercase'>
            Екран
          </p>
        </div>

        <div
          className='grid gap-2 mx-auto w-fit'
          style={{
            gridTemplateColumns: `repeat(${hall.cols_count}, minmax(32px, 1fr))`,
          }}
        >
          {Array.from({ length: hall.rows_count * hall.cols_count }).map(
            (_, index) => {
              const x = index % hall.cols_count
              const y = Math.floor(index / hall.cols_count)
              const seat = hall.seats.find(
                s => s.grid_x === x && s.grid_y === y,
              )

              if (!seat) return <div key={index} />

              const isSelected = selectedSeats.some(s => s.id === seat.id)
              const isBooked = seat.status === 1
              const seatType = Object.values(SEAT_TYPES).find(
                t => t.id === seat.seat_type_id,
              )

              return (
                <button
                  type='button'
                  key={seat.id}
                  disabled={isBooked}
                  onClick={() => onToggleSeat(seat)}
                  className={clsx(
                    'group relative flex h-8 w-8 items-center justify-center rounded transition-all',
                    isBooked
                      ? 'cursor-not-allowed bg-zinc-800 text-zinc-600 opacity-50'
                      : isSelected
                        ? 'bg-white text-black scale-110 shadow-lg shadow-white/20 z-10'
                        : `${seatType?.color} text-white hover:opacity-80 hover:scale-105`,
                  )}
                  title={`Row ${seat.row_label}, Seat ${seat.number} (${seatType?.name})`}
                >
                  <Armchair
                    size={18}
                    fill={isSelected ? 'black' : 'currentColor'}
                  />
                </button>
              )
            },
          )}
        </div>
      </div>
    </div>
  )
}

export default SeatSelector
