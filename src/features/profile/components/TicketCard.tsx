import { type OrderItem } from '../../../types/order'
import { Calendar, Clock, MapPin, QrCode } from 'lucide-react'

interface TicketCardProps {
  order: OrderItem
  isHistory?: boolean
}

const TicketCard = ({ order, isHistory = false }: TicketCardProps) => {
  const dateObj = new Date(order.sessionDate)

  return (
    <div className='group relative overflow-hidden rounded-xl border border-white/5 bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/30'>
      <div className='flex flex-col sm:flex-row'>
        <div className='relative h-48 w-full sm:h-auto sm:w-32 shrink-0'>
          <img
            src={order.posterUrl}
            alt={order.movieTitle}
            className={`h-full w-full object-cover transition-all ${isHistory ? 'grayscale opacity-50' : ''}`}
          />
          {!isHistory && (
            <div className='absolute top-2 left-2 rounded bg-[var(--color-success)] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md'>
              Active
            </div>
          )}
        </div>

        <div className='flex flex-1 flex-col justify-between p-4 sm:p-5'>
          <div>
            <h3
              className={`text-lg font-bold text-white mb-3 line-clamp-1 ${isHistory ? 'text-[var(--text-muted)]' : 'group-hover:text-[var(--color-primary)] transition-colors'}`}
            >
              {order.movieTitle}
            </h3>

            <div className='space-y-2 text-xs font-medium text-[var(--text-muted)]'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded'>
                  <Calendar size={12} className='text-[var(--color-primary)]' />
                  <span>{dateObj.toLocaleDateString()}</span>
                </div>
                <div className='flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded'>
                  <Clock size={12} className='text-[var(--color-primary)]' />
                  <span>
                    {dateObj.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2 px-1'>
                <MapPin size={12} />
                <span>{order.cinemaHall}</span>
              </div>

              <div className='flex flex-wrap gap-1.5 mt-3'>
                {order.seats.map(seat => (
                  <span
                    key={seat}
                    className='rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-zinc-300 uppercase tracking-wide'
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between border-t border-white/5 pt-3'>
            <div className='text-lg font-bold text-white'>
              ₴ {order.totalPrice}
            </div>

            {!isHistory && (
              <button
                type='button'
                className='flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors uppercase tracking-wider'
              >
                <QrCode size={16} />
                QR-код
              </button>
            )}

            {isHistory && (
              <div className='text-[10px] text-zinc-600 uppercase font-bold tracking-widest'>
                Архів
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
