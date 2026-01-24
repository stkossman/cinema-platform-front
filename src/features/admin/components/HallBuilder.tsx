import { useState } from 'react'
import type { Seat, SeatType } from '../../../types/hall'
import { SEAT_TYPES } from '../../../common/constants/seatTypes'
import { Plus, Save, Armchair } from 'lucide-react'
import { clsx } from 'clsx'

interface HallBuilderProps {
  initialRows?: number
  initialCols?: number
  onSave: (hallData: { rows: number; cols: number; seats: Seat[] }) => void
}

const HallBuilder = ({
  initialRows = 10,
  initialCols = 15,
  onSave,
}: HallBuilderProps) => {
  const [rows, setRows] = useState(initialRows)
  const [cols, setCols] = useState(initialCols)

  const [selectedType, setSelectedType] = useState<SeatType>(
    SEAT_TYPES.standard,
  )

  const [seats, setSeats] = useState<Seat[]>([])

  const handleCellClick = (x: number, y: number) => {
    const existingSeatIndex = seats.findIndex(
      s => s.grid_x === x && s.grid_y === y,
    )

    if (existingSeatIndex >= 0) {
      const existingSeat = seats[existingSeatIndex]

      if (existingSeat.seat_type_id === selectedType.id) {
        const newSeats = [...seats]
        newSeats.splice(existingSeatIndex, 1)
        setSeats(newSeats)
      } else {
        const newSeats = [...seats]
        newSeats[existingSeatIndex] = {
          ...existingSeat,
          seat_type_id: selectedType.id,
        }
        setSeats(newSeats)
      }
    } else {
      const rowLabel = String.fromCharCode(65 + y)
      const seatNum = x + 1

      const newSeat: Seat = {
        id: crypto.randomUUID(),
        hall_id: '',
        seat_type_id: selectedType.id,
        grid_x: x,
        grid_y: y,
        row_label: rowLabel,
        number: seatNum,
        status: 0,
      }
      setSeats([...seats, newSeat])
    }
  }

  const handleSave = () => {
    onSave({ rows, cols, seats })
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-zinc-900 p-4'>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-zinc-500'>Рядів (Y)</label>
            <input
              type='number'
              min={1}
              max={30}
              value={rows}
              onChange={e => setRows(Number(e.target.value))}
              className='w-20 rounded bg-black px-2 py-1 text-white border border-white/20'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-xs text-zinc-500'>Місць (X)</label>
            <input
              type='number'
              min={1}
              max={40}
              value={cols}
              onChange={e => setCols(Number(e.target.value))}
              className='w-20 rounded bg-black px-2 py-1 text-white border border-white/20'
            />
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-zinc-500 mr-2'>Тип місця:</span>
          {Object.values(SEAT_TYPES).map(type => (
            <button
              type='button'
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={clsx(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all border',
                selectedType.id === type.id
                  ? 'border-white bg-white/10 text-white'
                  : 'border-transparent hover:bg-white/5 text-zinc-400',
              )}
            >
              <div className={`h-4 w-4 rounded ${type.color}`} />
              {type.name}
            </button>
          ))}
        </div>

        <button
          type='button'
          onClick={handleSave}
          className='flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700'
        >
          <Save size={16} />
          Зберегти залу
        </button>
      </div>

      <div className='overflow-x-auto rounded-xl border border-white/10 bg-black p-8'>
        <div
          className='grid gap-2 mx-auto w-fit'
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(30px, 1fr))`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const x = index % cols
            const y = Math.floor(index / cols)

            const seat = seats.find(s => s.grid_x === x && s.grid_y === y)
            const seatType = seat
              ? Object.values(SEAT_TYPES).find(t => t.id === seat.seat_type_id)
              : null

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                className={clsx(
                  'h-8 w-8 rounded flex items-center justify-center cursor-pointer transition-all text-[10px] select-none',
                  seat
                    ? `${seatType?.color} text-white shadow-lg`
                    : 'bg-zinc-900 hover:bg-zinc-800 border border-white/5',
                )}
                title={
                  seat
                    ? `Row: ${seat.row_label}, Num: ${seat.number}`
                    : `Empty (${x}, ${y})`
                }
              >
                {seat ? (
                  <Armchair size={16} fill='currentColor' />
                ) : (
                  <Plus
                    size={10}
                    className='text-zinc-700 opacity-0 hover:opacity-100'
                  />
                )}
              </div>
            )
          })}
        </div>

        <div className='mt-8 w-full flex justify-center'>
          <div className='w-2/3 h-2 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 rounded-full opacity-50 shadow-[0_10px_20px_rgba(255,255,255,0.1)]' />
        </div>
        <p className='text-center text-xs text-zinc-500 mt-2 uppercase tracking-widest'>
          Екран
        </p>
      </div>

      <div className='text-zinc-400 text-sm'>
        Всього місць:{' '}
        <span className='text-white font-bold'>{seats.length}</span>
      </div>
    </div>
  )
}

export default HallBuilder
