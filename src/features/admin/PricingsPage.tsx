import { useState } from 'react'
import { usePricings } from './hooks/usePricings'
import { Plus, Tag, Edit, Layers, Loader2, CalendarRange } from 'lucide-react'
import PricingModal from './components/PricingModal'
import PricingRulesEditor from './components/PricingRulesEditor'
import type { PricingDetailsDto } from '../../services/adminPricingsService'

const PricingsPage = () => {
  const { pricings, isLoading, createPricing, updateRules } = usePricings()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPricing, setEditingPricing] =
    useState<PricingDetailsDto | null>(null)

  const handleEditClick = (pricing: PricingDetailsDto) => {
    setEditingPricing(pricing)
  }

  const getPriceRange = (items: any[]) => {
    if (!items || items.length === 0) return 'Not configured'
    const prices = items.map(i => i.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    return min === max ? `${min} ₴` : `${min} - ${max} ₴`
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Pricing Schemes</h1>
          <p className='text-[var(--text-muted)] mt-1'>
            Configure ticket prices for different seat types and days
          </p>
        </div>
        <button
          type='button'
          onClick={() => setIsCreateModalOpen(true)}
          className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20'
        >
          <Plus size={18} /> New Scheme
        </button>
      </div>

      {isLoading ? (
        <div className='flex justify-center py-20'>
          <Loader2 className='animate-spin text-[var(--color-primary)] h-8 w-8' />
        </div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {pricings.length === 0 && (
            <div className='col-span-full text-center py-10 text-[var(--text-muted)] border border-dashed border-white/10 rounded-xl bg-[var(--bg-card)]/30'>
              No pricing schemes found. Create one to start selling tickets.
            </div>
          )}

          {pricings.map(price => (
            <div
              key={price.id}
              className='group relative overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg flex flex-col'
            >
              <div className='p-6 flex-1'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='h-10 w-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]'>
                    <Tag size={20} />
                  </div>
                  <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button
                      type='button'
                      onClick={() => handleEditClick(price)}
                      className='p-2 rounded hover:bg-white/10 text-[var(--text-muted)] hover:text-white'
                      title='Edit Rules'
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>

                <h3 className='text-xl font-bold text-white mb-2'>
                  {price.name}
                </h3>

                <div className='flex flex-col gap-2 mt-4'>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-[var(--text-muted)] flex items-center gap-2'>
                      <Layers size={14} /> Active Rules:
                    </span>
                    <span className='text-white font-medium'>
                      {price.items?.length || 0}
                    </span>
                  </div>
                  <div className='flex items-center justify-between text-sm'>
                    <span className='text-[var(--text-muted)] flex items-center gap-2'>
                      <CalendarRange size={14} /> Range:
                    </span>
                    <span className='text-[var(--color-success)] font-bold font-mono'>
                      {getPriceRange(price.items)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type='button'
                onClick={() => handleEditClick(price)}
                className='w-full py-3 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-white transition-colors border-t border-white/5'
              >
                Configure Prices
              </button>
            </div>
          ))}
        </div>
      )}

      <PricingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={createPricing}
      />

      {editingPricing && (
        <PricingRulesEditor
          pricing={editingPricing}
          onClose={() => setEditingPricing(null)}
          onSave={updateRules}
        />
      )}
    </div>
  )
}

export default PricingsPage
