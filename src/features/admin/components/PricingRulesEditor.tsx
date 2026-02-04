import { useState, useEffect } from 'react'
import { X, Loader2, Save } from 'lucide-react'
import {
  type PricingDetailsDto,
  type SetPricingRuleDto,
} from '../../../services/adminPricingsService'
import { seatTypesService } from '../../../services/seatTypesService'
import { type SeatType } from '../../../types/hall'

interface PricingRulesEditorProps {
  pricing: PricingDetailsDto
  onClose: () => void
  onSave: (
    id: string,
    rules: SetPricingRuleDto[],
  ) => Promise<{ success: boolean; error?: string }>
}

const DAYS = [
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
  { id: 0, name: 'Sunday' },
]

const PricingRulesEditor = ({
  pricing,
  onClose,
  onSave,
}: PricingRulesEditorProps) => {
  const [seatTypes, setSeatTypes] = useState<SeatType[]>([])
  const [matrix, setMatrix] = useState<Record<string, number>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const types = await seatTypesService.getAll()
        setSeatTypes(types)

        const initialMatrix: Record<string, number> = {}
        if (pricing.items && pricing.items.length > 0) {
          pricing.items.forEach(item => {
            const key = `${item.dayOfWeek}-${item.seatTypeId}`
            initialMatrix[key] = item.price
          })
        }
        setMatrix(initialMatrix)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [pricing])

  const handlePriceChange = (day: number, seatTypeId: string, val: string) => {
    const key = `${day}-${seatTypeId}`
    if (val === '') {
      const newMatrix = { ...matrix }
      delete newMatrix[key]
      setMatrix(newMatrix)
      return
    }

    const num = parseFloat(val)
    if (!isNaN(num)) {
      setMatrix(prev => ({ ...prev, [key]: num }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    const rules: SetPricingRuleDto[] = []

    Object.entries(matrix).forEach(([key, price]) => {
      const parts = key.split('-')
      if (parts.length < 2) return
      const dayStr = parts[0]
      const seatTypeId = parts.slice(1).join('-')

      if (price > 0 && seatTypeId) {
        rules.push({
          dayOfWeek: parseInt(dayStr),
          seatTypeId: seatTypeId,
          price,
        })
      }
    })

    const result = await onSave(pricing.id, rules)
    setIsSaving(false)
    if (result.success) {
      onClose()
    } else {
      alert(result.error)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in'>
      <div className='w-full max-w-5xl bg-[var(--bg-card)] border border-white/10 rounded-xl shadow-2xl flex flex-col max-h-[90vh]'>
        <div className='flex items-center justify-between border-b border-white/10 p-6'>
          <div>
            <h2 className='text-xl font-bold text-white'>
              Edit Rules:{' '}
              <span className='text-[var(--color-primary)]'>
                {pricing.name}
              </span>
            </h2>
            <p className='text-sm text-[var(--text-muted)]'>
              Set prices for each seat type per day of week.
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='text-[var(--text-muted)] hover:text-white'
          >
            <X size={24} />
          </button>
        </div>

        <div className='flex-1 overflow-auto p-6 custom-scrollbar'>
          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loader2
                className='animate-spin text-[var(--color-primary)]'
                size={32}
              />
            </div>
          ) : (
            <table className='w-full text-sm text-left border-collapse'>
              <thead className='text-xs text-[var(--text-muted)] uppercase bg-white/5 sticky top-0 z-10 backdrop-blur-md'>
                <tr>
                  <th className='px-4 py-3 rounded-tl-lg border-b border-white/10'>
                    Day
                  </th>
                  {seatTypes.map(st => (
                    <th
                      key={st.id}
                      className='px-4 py-3 text-center border-b border-white/10 border-l border-white/5'
                      style={{ color: st.color }}
                    >
                      {st.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-white/5'>
                {DAYS.map(day => (
                  <tr
                    key={day.id}
                    className='hover:bg-white/5 transition-colors'
                  >
                    <td className='px-4 py-3 font-medium text-white border-r border-white/5 bg-white/5'>
                      {day.name}
                    </td>
                    {seatTypes.map(st => {
                      const key = `${day.id}-${st.id}`
                      const price = matrix[key] !== undefined ? matrix[key] : ''
                      return (
                        <td
                          key={st.id}
                          className='px-2 py-2 border-l border-white/5'
                        >
                          <div className='relative group'>
                            <input
                              type='number'
                              min='0'
                              step='10'
                              placeholder='-'
                              value={price}
                              onChange={e =>
                                handlePriceChange(day.id, st.id, e.target.value)
                              }
                              className='w-full bg-transparent border border-white/5 rounded px-2 py-2 text-center text-white focus:border-[var(--color-primary)] focus:bg-[var(--bg-main)] outline-none transition-all placeholder:text-white/10 font-mono'
                            />
                            {price !== '' && (
                              <span className='absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[10px] pointer-events-none'>
                                ₴
                              </span>
                            )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className='border-t border-white/10 p-6 flex justify-end gap-3 bg-[var(--bg-card)] rounded-b-xl'>
          <button
            type='button'
            onClick={onClose}
            className='px-6 py-2 rounded-lg text-sm font-bold text-[var(--text-muted)] hover:text-white transition-colors'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSave}
            disabled={isSaving}
            className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-lg disabled:opacity-50'
          >
            {isSaving ? (
              <Loader2 className='animate-spin' size={16} />
            ) : (
              <Save size={16} />
            )}
            Save Rules
          </button>
        </div>
      </div>
    </div>
  )
}

export default PricingRulesEditor
