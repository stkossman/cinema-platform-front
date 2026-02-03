import { useState } from 'react'
import { Plus, Tag, Edit, Trash2, Layers } from 'lucide-react'

const PricingsPage = () => {
  const [pricings] = useState([
    {
      id: 'cee75ce0-5484-4afd-a779-ca762dfe9',
      name: 'Standard Evening',
      itemsCount: 5,
      priceRange: '150 - 400 ₴',
    },
    {
      id: 'd2a15ce1-6632-1bce-d881-ab123efg5',
      name: 'Weekend Prime',
      itemsCount: 3,
      priceRange: '200 - 500 ₴',
    },
  ])

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Цінові схеми</h1>
          <p className='text-[var(--text-muted)] mt-1'>
            Налаштування тарифів (Pricings)
          </p>
        </div>
        <button
          type='button'
          className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20'
        >
          <Plus size={18} /> Створити схему
        </button>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {pricings.map(price => (
          <div
            key={price.id}
            className='group relative overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] transition-all hover:border-[var(--color-primary)]/30 hover:shadow-lg'
          >
            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div className='h-10 w-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]'>
                  <Tag size={20} />
                </div>
                <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button
                    type='button'
                    className='p-2 rounded hover:bg-white/10 text-[var(--text-muted)] hover:text-white'
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    type='button'
                    className='p-2 rounded hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className='text-xl font-bold text-white mb-2'>
                {price.name}
              </h3>

              <div className='flex flex-col gap-2 mt-4'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-[var(--text-muted)] flex items-center gap-2'>
                    <Layers size={14} /> Правил цін:
                  </span>
                  <span className='text-white font-medium'>
                    {price.itemsCount}
                  </span>
                </div>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-[var(--text-muted)]'>Діапазон:</span>
                  <span className='text-[var(--color-success)] font-bold'>
                    {price.priceRange}
                  </span>
                </div>
              </div>
            </div>

            <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent opacity-50'></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingsPage
