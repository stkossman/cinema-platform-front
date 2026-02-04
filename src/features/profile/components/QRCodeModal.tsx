import { X, ScanLine, Copy, Hash } from 'lucide-react'
import { useEffect, useState } from 'react'

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  bookingId: string
  ticketId: string
  movieTitle: string
  seats: string[]
}

const QRCodeModal = ({
  isOpen,
  onClose,
  bookingId,
  ticketId,
  movieTitle,
}: QRCodeModalProps) => {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketId)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <div
        className='absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200'
        onClick={onClose}
      ></div>

      <div className='relative w-full max-w-sm rounded-3xl bg-[#1a1a1a] border border-white/10 p-8 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center'>
        <button
          type='button'
          onClick={onClose}
          className='absolute right-4 top-4 p-2 text-[var(--text-muted)] hover:text-white transition-colors'
        >
          <X size={20} />
        </button>

        <h3 className='text-lg font-bold text-white mb-1'>Ваш квиток</h3>
        <p className='text-sm text-[var(--text-muted)] mb-6 line-clamp-1'>
          {movieTitle}
        </p>

        <div className='relative group p-4 bg-white rounded-2xl mb-6 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]'>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${ticketId}&bgcolor=ffffff`}
            alt='Ticket QR Code'
            className='w-48 h-48 object-contain mix-blend-multiply'
          />

          <div className='absolute left-0 right-0 top-0 h-1 bg-[var(--color-primary)]/50 shadow-[0_0_15px_var(--color-primary)] animate-[scan_2.5s_ease-in-out_infinite] pointer-events-none rounded-full mx-4 opacity-50'></div>
        </div>

        <div className='w-full space-y-3'>
          <div className='flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5'>
            <div className='text-left'>
              <div className='text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5'>
                Booking ID
              </div>
              <div className='text-sm font-mono font-bold text-white'>
                {bookingId}
              </div>
            </div>
          </div>

          <div className='flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5'>
            <div className='text-left overflow-hidden'>
              <div className='text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-0.5 flex items-center gap-1'>
                <Hash size={10} /> Ticket UUID
              </div>
              <div
                className='text-[10px] font-mono text-[var(--text-muted)] truncate w-48'
                title={ticketId}
              >
                {ticketId}
              </div>
            </div>
            <button
              type='button'
              onClick={handleCopy}
              className='p-2 hover:bg-white/10 rounded-lg transition-colors text-[var(--text-muted)] hover:text-white'
              title='Скопіювати UUID'
            >
              {isCopied ? (
                <span className='text-[var(--color-success)] text-xs font-bold'>
                  Скопійовано
                </span>
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>

          <div className='flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] pt-2'>
            <ScanLine size={16} />
            <span>Покажіть цей код контролеру</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 90%; }
        }
      `}</style>
    </div>
  )
}

export default QRCodeModal
