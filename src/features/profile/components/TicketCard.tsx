import { useState } from 'react'
import { type OrderItem } from '../../../types/order'
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  X,
  Copy,
  Check,
  ScanLine,
} from 'lucide-react'

interface TicketCardProps {
  order: OrderItem
  isHistory?: boolean
}

const TicketCard = ({ order, isHistory = false }: TicketCardProps) => {
  const [showQr, setShowQr] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const dateObj = new Date(order.sessionDate)

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${order.id}&bgcolor=ffffff`

  return (
    <div className='group relative overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.15)] border border-white/5 min-h-[220px]'>
      <div
        className={`absolute inset-0 z-20 bg-[#1a1a1a] flex flex-col items-center justify-between p-4 transition-transform duration-500 ease-in-out ${
          showQr
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className='w-full flex justify-between items-center mb-2'>
          <h3 className='text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest flex items-center gap-2'>
            <ScanLine size={14} /> Сканувати для входу
          </h3>
          <button
            type='button'
            onClick={() => setShowQr(false)}
            className='p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors'
          >
            <X size={18} />
          </button>
        </div>

        <div className='flex-1 flex items-center justify-center w-full py-2 min-h-0'>
          <div className='bg-white p-2 rounded-xl shadow-xl relative group/qr h-full max-h-[160px] aspect-square flex items-center justify-center'>
            <img
              src={qrCodeUrl}
              alt='Ticket QR'
              className='w-full h-full object-contain mix-blend-multiply'
              loading='lazy'
            />
            <div className='absolute left-0 right-0 top-0 h-0.5 bg-red-500 shadow-[0_0_10px_red] animate-[scan_2s_ease-in-out_infinite] opacity-50 mx-2 rounded-full pointer-events-none'></div>
          </div>
        </div>

        <div className='w-full bg-white/5 rounded-xl p-2 flex items-center justify-between border border-white/5 mt-2'>
          <div className='px-2 overflow-hidden flex flex-col'>
            <span className='text-[9px] text-[var(--text-muted)] uppercase font-bold tracking-wider'>
              ID Квитка
            </span>
            <span
              className='text-[10px] font-mono text-white truncate w-full max-w-[200px]'
              title={order.id}
            >
              {order.id}
            </span>
          </div>
          <button
            type='button'
            onClick={handleCopy}
            className='p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 shrink-0'
            title='Скопіювати ID'
          >
            {isCopied ? (
              <Check size={14} className='text-green-500' />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col sm:flex-row h-full transition-transform duration-500 ${showQr ? 'scale-95 opacity-30 blur-[2px]' : ''}`}
      >
        <div className='relative h-48 w-full sm:h-auto sm:w-40 shrink-0 overflow-hidden'>
          <img
            src={order.posterUrl}
            alt={order.movieTitle}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${isHistory ? 'grayscale opacity-50' : ''}`}
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent sm:bg-gradient-to-t'></div>

          {!isHistory && (
            <div className='absolute top-3 left-3 rounded-md bg-[var(--color-success)] px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider shadow-lg'>
              Active
            </div>
          )}
        </div>

        <div className='hidden sm:flex flex-col justify-between absolute left-40 top-0 bottom-0 w-4 z-10'>
          <div className='w-4 h-4 bg-[var(--bg-card)] rounded-full -ml-2 -mt-2'></div>
          <div className='border-l-2 border-dashed border-zinc-700/30 h-full ml-[1px]'></div>
          <div className='w-4 h-4 bg-[var(--bg-card)] rounded-full -ml-2 -mb-2'></div>
        </div>

        <div className='flex flex-1 flex-col justify-between p-5 sm:pl-8 relative bg-gradient-to-br from-white/5 to-transparent'>
          <div>
            <h3
              className={`text-xl font-black text-white mb-4 line-clamp-1 ${isHistory ? 'text-[var(--text-muted)]' : 'group-hover:text-[var(--color-primary)] transition-colors'}`}
            >
              {order.movieTitle}
            </h3>

            <div className='grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-medium text-[var(--text-muted)]'>
              <div className='flex items-center gap-2'>
                <Calendar
                  size={14}
                  className='text-[var(--color-primary)] shrink-0'
                />
                <span className='text-white truncate'>
                  {dateObj.toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock
                  size={14}
                  className='text-[var(--color-primary)] shrink-0'
                />
                <span className='text-white truncate'>
                  {dateObj.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2 col-span-2'>
                <MapPin size={14} className='text-white shrink-0' />
                <span className='truncate'>{order.cinemaHall}</span>
              </div>
            </div>

            <div className='mt-4 flex flex-wrap gap-2'>
              {order.seats.map(seat => (
                <span
                  key={seat}
                  className='inline-flex items-center rounded bg-white/10 border border-white/5 px-2 py-1 text-[10px] font-bold text-zinc-300 uppercase'
                >
                  {seat}
                </span>
              ))}
            </div>
          </div>

          <div className='mt-5 flex items-center justify-between border-t border-white/5 pt-3'>
            <div>
              <span className='text-[10px] text-[var(--text-muted)] uppercase tracking-wider block'>
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
                <span className='hidden sm:inline'>QR Код</span>
                <span className='sm:hidden'>QR</span>
              </button>
            ) : (
              <div className='px-3 py-1 rounded border border-white/10 text-[10px] text-zinc-500 uppercase font-bold tracking-widest'>
                Використано
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 5%; opacity: 0; }
          50% { top: 95%; }
        }
      `}</style>
    </div>
  )
}

export default TicketCard
