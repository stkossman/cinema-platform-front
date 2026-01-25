import type { Hall, Seat } from '../../../types/hall'
import { clsx } from 'clsx'
import { Armchair } from 'lucide-react'
import { useMemo } from 'react'

interface SeatSelectorProps {
  hall: Hall
  selectedSeats: Seat[]
  onToggleSeat: (seat: Seat) => void
}

const getSeatColor = (typeName: string = 'Standard') => {
  const lowerName = typeName.toLowerCase()
  if (lowerName.includes('vip') || lowerName.includes('lux'))
    return 'bg-yellow-500'
  if (lowerName.includes('love') || lowerName.includes('sofa'))
    return 'bg-pink-500'
  return 'bg-blue-600'
}

const SeatSelector = ({
  hall,
  selectedSeats,
  onToggleSeat,
}: SeatSelectorProps) => {
  const cols = hall.colsCount || 10
  const rows = hall.rowsCount || 10

  const availableTypes = useMemo(() => {
    const types = new Map<string, string>()
    hall.seats.forEach(seat => {
      if (!types.has(seat.seatTypeName)) {
        types.set(seat.seatTypeName, getSeatColor(seat.seatTypeName))
      }
    })
    return Array.from(types.entries())
  }, [hall.seats])

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold text-white'>Оберіть місця</h2>

      <div className='flex flex-wrap gap-4 text-xs text-zinc-400'>
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

        {availableTypes.map(([name, colorClass]) => (
          <div key={name} className='flex items-center gap-2'>
            <div className={`h-4 w-4 rounded ${colorClass}`} /> {name}
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
            gridTemplateColumns: `repeat(${cols}, minmax(32px, 1fr))`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const x = index % cols
            const y = Math.floor(index / cols)

            const seat = hall.seats.find(s => s.gridX === x && s.gridY === y)

            if (!seat) return <div key={index} />

            const isSelected = selectedSeats.some(s => s.id === seat.id)
            const isBooked = seat.status === 'Booked' || seat.status === 'Sold'

            const seatColorClass = getSeatColor(seat.seatTypeName)

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
                      : `${seatColorClass} text-white hover:opacity-80 hover:scale-105`,
                )}
                title={`Row ${seat.row}, Seat ${seat.number} (${seat.seatTypeName})`}
              >
                <Armchair
                  size={18}
                  fill={isSelected ? 'black' : 'currentColor'}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SeatSelector
