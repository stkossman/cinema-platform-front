import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import type { Seat, SeatType } from '../../../types/hall'
import { Plus, Save, Armchair, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

interface HallBuilderProps {
  initialRows?: number
  initialCols?: number
  initialSeats?: Seat[]
  onSave: (hallData: { rows: number; cols: number; seats: Seat[] }) => void
  isEditing?: boolean
}

const getSeatColor = (typeName: string = 'Standard') => {
  const lowerName = typeName.toLowerCase()
  if (lowerName.includes('vip') || lowerName.includes('lux'))
    return 'bg-yellow-500'
  if (lowerName.includes('love') || lowerName.includes('sofa'))
    return 'bg-pink-500'
  return 'bg-blue-600'
}

const HallBuilder = ({
  initialRows = 10,
  initialCols = 15,
  initialSeats = [],
  onSave,
  isEditing = false,
}: HallBuilderProps) => {
  const [rows, setRows] = useState(initialRows)
  const [cols, setCols] = useState(initialCols)

  const [seats, setSeats] = useState<Seat[]>(initialSeats)

  const [availableSeatTypes, setAvailableSeatTypes] = useState<SeatType[]>([])
  const [selectedType, setSelectedType] = useState<SeatType | null>(null)
  const [isLoadingTypes, setIsLoadingTypes] = useState(true)

  useEffect(() => {
    if (initialSeats.length > 0) {
      setSeats(initialSeats)
      const maxX = Math.max(...initialSeats.map(s => s.gridX))
      const maxY = Math.max(...initialSeats.map(s => s.gridY))
      if (maxX >= cols) setCols(maxX + 1)
      if (maxY >= rows) setRows(maxY + 1)
    }
  }, [initialSeats])

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data, error } = await supabase.from('seat_types').select('*')
        if (error) throw error

        if (data && data.length > 0) {
          const types: SeatType[] = data.map((t: any) => ({
            id: t.id,
            name: t.name,
            description: t.description,
          }))
          setAvailableSeatTypes(types)
          const standard = types.find(t =>
            t.name.toLowerCase().includes('standard'),
          )
          setSelectedType(standard || types[0])
        }
      } catch (error) {
        console.error('Failed to load seat types:', error)
      } finally {
        setIsLoadingTypes(false)
      }
    }
    fetchTypes()
  }, [])

  const handleCellClick = (x: number, y: number) => {
    if (!selectedType) return

    const existingSeatIndex = seats.findIndex(
      s => s.gridX === x && s.gridY === y,
    )

    if (existingSeatIndex >= 0) {
      const existingSeat = seats[existingSeatIndex]

      if (existingSeat.seatTypeId === selectedType.id) {
        const newSeats = [...seats]
        newSeats.splice(existingSeatIndex, 1)
        setSeats(newSeats)
      } else {
        const newSeats = [...seats]
        newSeats[existingSeatIndex] = {
          ...existingSeat,
          seatTypeId: selectedType.id,
          seatTypeName: selectedType.name,
        }
        setSeats(newSeats)
      }
    } else {
      const rowLabel = String.fromCharCode(65 + y)
      const seatNum = x + 1

      const newSeat: Seat = {
        id: crypto.randomUUID(),
        row: rowLabel,
        number: seatNum,
        gridX: x,
        gridY: y,
        status: 'Available',
        seatTypeId: selectedType.id,
        seatTypeName: selectedType.name,
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
          {availableSeatTypes.map(type => {
            const colorClass = getSeatColor(type.name)
            return (
              <button
                type='button'
                key={type.id}
                onClick={() => setSelectedType(type)}
                className={clsx(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all border',
                  selectedType?.id === type.id
                    ? 'border-white bg-white/10 text-white'
                    : 'border-transparent hover:bg-white/5 text-zinc-400',
                )}
              >
                <div className={`h-4 w-4 rounded ${colorClass}`} />
                {type.name}
              </button>
            )
          })}
        </div>

        <button
          type='button'
          onClick={handleSave}
          disabled={seats.length === 0}
          className='flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Save size={16} />
          {isEditing ? 'Зберегти зміни' : 'Зберегти залу'}
        </button>
      </div>

      <div className='overflow-x-auto rounded-xl border border-white/10 bg-black p-8'>
        <div
          className='grid gap-2 mx-auto w-fit'
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(30px, 1fr))` }}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const x = index % cols
            const y = Math.floor(index / cols)
            const seat = seats.find(s => s.gridX === x && s.gridY === y)
            const typeName =
              seat?.seatTypeName || selectedType?.name || 'Standard'
            const colorClass = getSeatColor(typeName)

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                className={clsx(
                  'h-8 w-8 rounded flex items-center justify-center cursor-pointer transition-all text-[10px] select-none',
                  seat
                    ? `${colorClass} text-white shadow-lg`
                    : 'bg-zinc-900 hover:bg-zinc-800 border border-white/5',
                )}
                title={
                  seat
                    ? `Row: ${seat.row}, Num: ${seat.number}`
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
