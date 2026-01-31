import type { Hall, Seat } from '../../../types/hall'
import { Armchair, Loader2 } from 'lucide-react'
import { useMemo } from 'react'

interface SeatSelectorProps {
  hall: Hall
  selectedSeats: Seat[]
  onToggleSeat: (seat: Seat) => void
  lockingSeatId?: string | null
}

const getSeatTypeStyle = (typeName: string = 'Standard') => {
  const lowerName = typeName.toLowerCase()
  if (lowerName.includes('vip') || lowerName.includes('lux'))
    return 'text-yellow-500 hover:text-yellow-400'
  if (lowerName.includes('love') || lowerName.includes('sofa'))
    return 'text-pink-500 hover:text-pink-400'

  return 'text-zinc-600 hover:text-zinc-400'
}

const SeatSelector = ({
  hall,
  selectedSeats,
  onToggleSeat,
  lockingSeatId,
}: SeatSelectorProps) => {
  const cols = hall.colsCount || 10
  const rows = hall.rowsCount || 10

  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    hall.seats.forEach(s => types.add(s.seatTypeName))
    return Array.from(types)
  }, [hall.seats])

  return (
    <div className='space-y-8'>
      <div className='flex flex-wrap justify-center gap-6 text-xs font-medium text-[var(--text-muted)]'>
        <div className='flex items-center gap-2'>
          <Armchair size={16} className='text-zinc-600' />
          <span>Вільне</span>
        </div>
        <div className='flex items-center gap-2'>
          <Armchair
            size={16}
            className='text-[var(--color-primary)]'
            fill='currentColor'
          />
          <span className='text-white'>Обране</span>
        </div>
        <div className='flex items-center gap-2'>
          <Armchair size={16} className='text-zinc-800' />
          <span className='opacity-50'>Зайнято</span>
        </div>

        {availableTypes.map(type => {
          if (type.toLowerCase() === 'standard') return null
          return (
            <div key={type} className='flex items-center gap-2'>
              <Armchair
                size={16}
                className={getSeatTypeStyle(type).split(' ')[0]}
              />
              <span>{type}</span>
            </div>
          )
        })}
      </div>

      <div className='relative w-full overflow-x-auto rounded-2xl border border-white/5 bg-[var(--bg-card)] p-10 shadow-2xl'>
        <div className='mx-auto mb-12 w-3/4'>
          <div className='h-1.5 w-full rounded-[50%] bg-gradient-to-r from-transparent via-[var(--color-primary)]/50 to-transparent shadow-[0_10px_40px_rgba(239,68,68,0.2)]' />
          <p className='mt-4 text-center text-[10px] font-bold tracking-[0.3em] text-zinc-600 uppercase'>
            Екран
          </p>
        </div>

        <div
          className='grid gap-y-3 gap-x-2 mx-auto w-fit'
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
            const isLocking = lockingSeatId === seat.id

            let seatClasses = 'transition-all duration-200 transform '
            let iconFill = 'none'

            if (isLocking) {
              seatClasses +=
                'text-[var(--color-primary)] opacity-50 cursor-wait scale-90'
            } else if (isSelected) {
              seatClasses +=
                'text-[var(--color-primary)] scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] z-10'
              iconFill = 'currentColor'
            } else {
              seatClasses +=
                getSeatTypeStyle(seat.seatTypeName) +
                ' hover:scale-110 hover:opacity-100 opacity-80'
              iconFill = 'none'
              if (seat.seatTypeName.toLowerCase().includes('vip'))
                iconFill = 'currentColor'
            }

            return (
              <button
                type='button'
                key={seat.id}
                disabled={isLocking}
                onClick={() => onToggleSeat(seat)}
                className={`group relative flex h-8 w-8 items-center justify-center outline-none focus:outline-none ${seatClasses}`}
                title={`Ряд ${seat.row}, Місце ${seat.number} (${seat.seatTypeName})`}
              >
                {isLocking ? (
                  <Loader2 size={16} className='animate-spin' />
                ) : (
                  <Armchair
                    size={
                      isSelected ||
                      seat.seatTypeName.toLowerCase().includes('vip')
                        ? 22
                        : 20
                    }
                    strokeWidth={2.5}
                    fill={iconFill}
                    fillOpacity={isSelected ? 1 : 0.3}
                  />
                )}

                {!isLocking && (
                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20'>
                    {seat.row}-{seat.number}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SeatSelector
