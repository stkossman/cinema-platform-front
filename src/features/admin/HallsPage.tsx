import { useState } from 'react'
import HallBuilder from '../../features/admin/components/HallBuilder'
import { type Seat } from '../../types/hall'

const HallsPage = () => {
  const [isCreating, setIsCreating] = useState(false)

  const handleSaveHall = (data: {
    rows: number
    cols: number
    seats: Seat[]
  }) => {
    console.log('Saving Hall Data to API:', data)
    alert(`Зал збережено! Кількість місць: ${data.seats.length}`)
    setIsCreating(false)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-white'>Управління залами</h1>
        <button
          type='button'
          onClick={() => setIsCreating(!isCreating)}
          className='rounded-lg bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200'
        >
          {isCreating ? 'Скасувати' : 'Створити новий зал'}
        </button>
      </div>

      {isCreating ? (
        <HallBuilder onSave={handleSaveHall} />
      ) : (
        <div className='rounded-xl border border-white/10 bg-zinc-900 p-8 text-center text-zinc-500'>
          Список залів порожній (тут буде таблиця)
        </div>
      )}
    </div>
  )
}

export default HallsPage
