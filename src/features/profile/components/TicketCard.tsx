import { useState } from 'react'
import { type OrderItem } from '../../../types/order'
import { Calendar, Clock, MapPin, QrCode } from 'lucide-react'
import QRCodeModal from './QRCodeModal'

interface TicketCardProps {
  order: OrderItem
  isHistory?: boolean
}

const TicketCard = ({ order, isHistory = false }: TicketCardProps) => {
  const [showQr, setShowQr] = useState(false)
  const dateObj = new Date(order.sessionDate)

  return (
    <>
      <div className='group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.15)] border border-white/5'>
        <div className='relative h-48 w-full sm:h-auto sm:w-40 shrink-0 overflow-hidden'>
          <img
            src={order.posterUrl}
            alt={order.movieTitle}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${isHistory ? 'grayscale opacity-50' : ''}`}
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/50 to-transparent sm:bg-gradient-to-t'></div>

          {!isHistory && (
            <div className='absolute top-3 left-3 rounded-md bg-[var(--color-success)] px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider shadow-lg'>
              Active
            </div>
          )}
        </div>

        <div className='hidden sm:flex flex-col justify-between absolute left-40 top-0 bottom-0 w-4 z-10'>
          <div className='w-4 h-4 bg-[var(--bg-card)] rounded-full -ml-2 -mt-2'></div>
          <div className='border-l-2 border-dashed border-zinc-700/50 h-full ml-[1px]'></div>
          <div className='w-4 h-4 bg-[var(--bg-card)] rounded-full -ml-2 -mb-2'></div>
        </div>

        <div className='flex flex-1 flex-col justify-between p-5 sm:pl-8 relative bg-gradient-to-br from-white/5 to-transparent'>
          <div>
            <h3
              className={`text-xl font-black text-white mb-4 line-clamp-1 ${isHistory ? 'text-[var(--text-muted)]' : 'group-hover:text-[var(--color-primary)] transition-colors'}`}
            >
              {order.movieTitle}
            </h3>

            <div className='grid grid-cols-2 gap-4 text-xs font-medium text-[var(--text-muted)]'>
              <div className='flex items-center gap-2'>
                <div className='p-1.5 bg-white/5 rounded-lg text-[var(--color-primary)]'>
                  <Calendar size={14} />
                </div>
                <span className='text-white'>
                  {dateObj.toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='p-1.5 bg-white/5 rounded-lg text-[var(--color-primary)]'>
                  <Clock size={14} />
                </div>
                <span className='text-white'>
                  {dateObj.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2 col-span-2'>
                <div className='p-1.5 bg-white/5 rounded-lg text-white'>
                  <MapPin size={14} />
                </div>
                <span>{order.cinemaHall}</span>
              </div>
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              {order.seats.map(seat => (
                <span
                  key={seat}
                  className='inline-flex items-center rounded-md border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-bold text-zinc-300 uppercase tracking-wide'
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className='mt-6 flex items-center justify-between border-t border-white/5 pt-4'>
            <div className='flex flex-col'>
              <span className='text-[10px] text-[var(--text-muted)] uppercase tracking-wider'>
                Сума
              </span>
              <span className='text-lg font-bold text-white'>
                ₴ {order.totalPrice}
              </span>
            </div>

            {!isHistory ? (
              <button
                type='button'
                onClick={() => setShowQr(true)}
                className='flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-xs font-bold hover:bg-zinc-200 transition-colors shadow-lg active:scale-95'
              >
                <QrCode size={16} />
                Показати QR
              </button>
            ) : (
              <div className='px-3 py-1 rounded border border-white/10 text-[10px] text-zinc-500 uppercase font-bold tracking-widest'>
                Використано
              </div>
            )}
          </div>
        </div>
      </div>

      <QRCodeModal
        isOpen={showQr}
        onClose={() => setShowQr(false)}
        bookingId={order.bookingId}
        ticketId={order.id}
        movieTitle={order.movieTitle}
        seats={order.seats}
      />
    </>
  )
}

export default TicketCard
