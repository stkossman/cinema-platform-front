import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { seatTypesService } from '../../../services/seatTypesService'
import type { Seat, SeatType, Technology } from '../../../types/hall'

import {
  Save,
  Armchair,
  Loader2,
  Cpu,
  Ruler,
  MousePointer2,
  PaintBucket,
} from 'lucide-react'
import { clsx } from 'clsx'

interface HallBuilderProps {
  initialRows?: number
  initialCols?: number
  initialSeats?: Seat[]
  onSave: (data: {
    rows: number
    cols: number
    technologyIds: string[]
    primarySeatTypeId: string
    seatConfig: { gridX: number; gridY: number; seatTypeId: string }[]
  }) => void
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
  initialRows = 5,
  initialCols = 8,
  initialSeats = [],
  onSave,
  isEditing = false,
}: HallBuilderProps) => {
  const [rows, setRows] = useState(initialRows)
  const [cols, setCols] = useState(initialCols)

  const [availableSeatTypes, setAvailableSeatTypes] = useState<SeatType[]>([])
  const [selectedPaintType, setSelectedPaintType] = useState<SeatType | null>(
    null,
  )

  const [availableTechnologies, setAvailableTechnologies] = useState<
    Technology[]
  >([])
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([])

  const [gridConfig, setGridConfig] = useState<Map<string, string>>(new Map())

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesData, techResponse] = await Promise.all([
          seatTypesService.getAll(),
          supabase.from('technologies').select('*'),
        ])

        if (typesData) {
          setAvailableSeatTypes(typesData)
          const standard = typesData.find(t =>
            t.name.toLowerCase().includes('standard'),
          )
          setSelectedPaintType(standard || typesData[0])
        }

        if (techResponse.data) {
          setAvailableTechnologies(
            techResponse.data.map((t: any) => ({
              id: t.id,
              name: t.name,
              type: t.type,
            })),
          )
        }
      } catch (error) {
        console.error('Failed to load builder data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (initialSeats.length > 0) {
      const maxX = Math.max(...initialSeats.map(s => s.gridX))
      const maxY = Math.max(...initialSeats.map(s => s.gridY))
      setCols(maxX + 1)
      setRows(maxY + 1)

      const newMap = new Map<string, string>()
      initialSeats.forEach(s => {
        newMap.set(`${s.gridX}-${s.gridY}`, s.seatTypeId)
      })
      setGridConfig(newMap)
    }
  }, [initialSeats])

  const toggleTech = (id: string) => {
    if (selectedTechIds.includes(id)) {
      setSelectedTechIds(selectedTechIds.filter(t => t !== id))
    } else {
      setSelectedTechIds([...selectedTechIds, id])
    }
  }

  const handleCellClick = (x: number, y: number) => {
    if (!selectedPaintType) return

    const key = `${x}-${y}`
    const newMap = new Map(gridConfig)

    newMap.set(key, selectedPaintType.id)
    setGridConfig(newMap)
  }

  const handleSave = () => {
    if (!availableSeatTypes.length) return

    const primaryType =
      availableSeatTypes.find(t => t.name.toLowerCase().includes('standard')) ||
      availableSeatTypes[0]

    const configArray: { gridX: number; gridY: number; seatTypeId: string }[] =
      []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const key = `${x}-${y}`
        const typeId = gridConfig.get(key) || primaryType.id
        configArray.push({ gridX: x, gridY: y, seatTypeId: typeId })
      }
    }

    onSave({
      rows,
      cols,
      technologyIds: selectedTechIds,
      primarySeatTypeId: primaryType.id,
      seatConfig: configArray,
    })
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-6 rounded-xl border border-white/10 bg-zinc-900 p-6'>
        <div className='flex flex-wrap gap-8'>
          <div className='flex flex-col gap-3'>
            <h4 className='text-sm font-medium text-zinc-400 flex items-center gap-2'>
              <Ruler size={16} /> Розміри залу
            </h4>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-1'>
                <label className='text-xs text-zinc-500'>Рядів</label>
                <input
                  type='number'
                  min={1}
                  max={20}
                  value={rows}
                  onChange={e => setRows(Number(e.target.value))}
                  disabled={isEditing}
                  className='w-20 rounded bg-black px-3 py-2 text-white border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-xs text-zinc-500'>Місць в ряду</label>
                <input
                  type='number'
                  min={1}
                  max={30}
                  value={cols}
                  onChange={e => setCols(Number(e.target.value))}
                  disabled={isEditing}
                  className='w-20 rounded bg-black px-3 py-2 text-white border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <h4 className='text-sm font-medium text-zinc-400 flex items-center gap-2'>
              <PaintBucket size={16} /> Тип для малювання
            </h4>
            <div className='flex flex-wrap gap-2'>
              {availableSeatTypes.map(type => {
                const colorClass = getSeatColor(type.name)
                const isSelected = selectedPaintType?.id === type.id
                return (
                  <button
                    type='button'
                    key={type.id}
                    onClick={() => setSelectedPaintType(type)}
                    className={clsx(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all border',
                      isSelected
                        ? 'border-white bg-white/10 text-white shadow-lg'
                        : 'border-transparent hover:bg-white/5 text-zinc-400',
                    )}
                  >
                    <div
                      className={`h-4 w-4 rounded ${colorClass} ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`}
                    />
                    {type.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <hr className='border-white/5' />

        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <span className='text-xs text-zinc-500 flex items-center gap-1 uppercase tracking-wider'>
              <Cpu size={12} /> Технології
            </span>
            <div className='flex flex-wrap gap-2'>
              {availableTechnologies.map(tech => (
                <button
                  key={tech.id}
                  type='button'
                  onClick={() => toggleTech(tech.id)}
                  className={clsx(
                    'px-3 py-1 text-xs rounded-full border transition-all',
                    selectedTechIds.includes(tech.id)
                      ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                      : 'bg-black border-zinc-700 text-zinc-400 hover:border-zinc-500',
                  )}
                >
                  {tech.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type='button'
            onClick={handleSave}
            className='flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700 ml-auto shadow-lg shadow-green-900/20'
          >
            <Save size={18} />
            {isEditing ? 'Зберегти зміни' : 'Згенерувати зал'}
          </button>
        </div>
      </div>

      <div className='relative overflow-hidden rounded-xl border border-white/10 bg-black p-8'>
        <div className='absolute top-4 right-4 text-xs text-zinc-500 flex items-center gap-1'>
          <MousePointer2 size={12} /> Натисніть, щоб змінити тип
        </div>

        <div
          className='grid gap-2 mx-auto w-fit transition-all duration-300'
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(30px, 1fr))` }}
        >
          {Array.from({ length: rows * cols }).map((_, i) => {
            const x = i % cols
            const y = Math.floor(i / cols)

            const configTypeId = gridConfig.get(`${x}-${y}`)
            const typeObj = configTypeId
              ? availableSeatTypes.find(t => t.id === configTypeId)
              : null
            const displayType =
              typeObj ||
              availableSeatTypes.find(t =>
                t.name.toLowerCase().includes('standard'),
              )

            const colorClass = getSeatColor(displayType?.name)

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                className={clsx(
                  'h-8 w-8 rounded flex items-center justify-center text-[10px] select-none shadow-lg cursor-pointer hover:opacity-80 transition-transform active:scale-95',
                  colorClass,
                  'text-white',
                )}
                title={`Row: ${y + 1}, Num: ${x + 1} (${displayType?.name})`}
              >
                <Armchair size={16} fill='currentColor' />
              </div>
            )
          })}
        </div>

        <div className='mt-10 w-full flex justify-center'>
          <div className='w-2/3 h-2 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 rounded-full opacity-50 shadow-[0_10px_20px_rgba(255,255,255,0.1)]' />
        </div>
        <p className='text-center text-xs text-zinc-500 mt-2 uppercase tracking-widest'>
          Екран
        </p>
      </div>

      <div className='text-zinc-400 text-sm'>
        Всього буде створено місць:{' '}
        <span className='text-white font-bold'>{rows * cols}</span>
      </div>
    </div>
  )
}

export default HallBuilder
