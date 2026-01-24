import { type OrderItem } from '../../../types/order'
import { Calendar, Clock, MapPin, QrCode } from 'lucide-react'

interface TicketCardProps {
  order: OrderItem
  isHistory?: boolean
}

const TicketCard = ({ order, isHistory = false }: TicketCardProps) => {
  const dateObj = new Date(order.sessionDate)

  return (
    <div className='group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 transition-all hover:border-white/20'>
      <div className='flex flex-col sm:flex-row'>
        <div className='relative h-48 w-full sm:h-auto sm:w-32 shrink-0'>
          <img
            src={order.posterUrl}
            alt={order.movieTitle}
            className={`h-full w-full object-cover transition-all ${isHistory ? 'grayscale opacity-50' : ''}`}
          />
          {!isHistory && (
            <div className='absolute top-2 left-2 rounded bg-green-500 px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider'>
              Active
            </div>
          )}
        </div>

        <div className='flex flex-1 flex-col justify-between p-4 sm:p-6'>
          <div>
            <h3
              className={`text-xl font-bold text-white mb-2 ${isHistory ? 'text-zinc-400' : ''}`}
            >
              {order.movieTitle}
            </h3>

            <div className='space-y-2 text-sm text-zinc-400'>
              <div className='flex items-center gap-2'>
                <Calendar size={14} />
                <span>{dateObj.toLocaleDateString()}</span>
                <Clock size={14} className='ml-2' />
                <span>
                  {dateObj.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin size={14} />
                <span>{order.cinemaHall}</span>
              </div>
              <div className='flex flex-wrap gap-2 mt-2'>
                {order.seats.map(seat => (
                  <span
                    key={seat}
                    className='rounded bg-white/10 px-2 py-1 text-xs text-zinc-300'
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between border-t border-white/5 pt-4'>
            <div className='font-bold text-white'>₴ {order.totalPrice}</div>

            {!isHistory && (
              <button
                type='button'
                className='flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition-colors'
              >
                <QrCode size={16} />
                Показати QR
              </button>
            )}

            {isHistory && (
              <div className='text-xs text-zinc-600 uppercase font-medium'>
                Completed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
