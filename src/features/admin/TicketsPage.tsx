import { useState } from 'react'
import { Search, Ticket, QrCode, Ban } from 'lucide-react'

const TicketStatus = {
  ACTIVE: 0,
  USED: 1,
  REFUNDED: 2,
}

const TicketsPage = () => {
  const [tickets] = useState([
    {
      id: '98a7b6c5-d4e3-f2a1-0b9c-8d7e6f5a4b3c',
      session_info: 'Dune: Part Two (IMAX)',
      seat_info: 'R5 S12',
      price_snapshot: 250.0,
      ticket_status: 0,
    },
    {
      id: '12d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
      session_info: 'Dune: Part Two (IMAX)',
      seat_info: 'R5 S13',
      price_snapshot: 250.0,
      ticket_status: 1,
    },
    {
      id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      session_info: 'Kung Fu Panda 4',
      seat_info: 'R2 S4',
      price_snapshot: 150.0,
      ticket_status: 2,
    },
  ])

  const getStatusBadge = (status: number) => {
    switch (status) {
      case TicketStatus.ACTIVE:
        return (
          <span className='bg-blue-500/10 text-blue-500 border-blue-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Активний
          </span>
        )
      case TicketStatus.USED:
        return (
          <span className='bg-gray-500/10 text-gray-500 border-gray-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Використано
          </span>
        )
      case TicketStatus.REFUNDED:
        return (
          <span className='bg-red-500/10 text-red-500 border-red-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Повернено
          </span>
        )
      default:
        return <span>-</span>
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Квитки</h1>
          <p className='text-[var(--text-muted)] mt-1'>База виданих квитків</p>
        </div>
      </div>

      <div className='relative'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'
          size={20}
        />
        <input
          type='text'
          placeholder='Введіть ID квитка...'
          className='w-full rounded-xl bg-[var(--bg-card)] border border-white/5 py-3 pl-10 pr-4 text-white placeholder-[var(--text-muted)] focus:border-[var(--color-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/50'
        />
      </div>

      <div className='rounded-xl border border-white/5 bg-[var(--bg-card)] overflow-hidden backdrop-blur-sm shadow-xl'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-white/5 text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider'>
            <tr>
              <th className='px-6 py-4'>ID Квитка</th>
              <th className='px-6 py-4'>Сеанс</th>
              <th className='px-6 py-4'>Місце</th>
              <th className='px-6 py-4'>Ціна</th>
              <th className='px-6 py-4'>Статус</th>
              <th className='px-6 py-4 text-right'>Дії</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {tickets.map(ticket => (
              <tr
                key={ticket.id}
                className='group hover:bg-[var(--bg-hover)] transition-colors'
              >
                <td className='px-6 py-4 font-mono text-[var(--text-muted)] text-xs flex items-center gap-2'>
                  <Ticket size={14} className='text-[var(--color-primary)]' />
                  {ticket.id.slice(0, 8)}...
                </td>
                <td className='px-6 py-4 text-white font-medium'>
                  {ticket.session_info}
                </td>
                <td className='px-6 py-4 font-bold text-[var(--color-primary)]'>
                  {ticket.seat_info}
                </td>
                <td className='px-6 py-4 text-white'>
                  {ticket.price_snapshot} ₴
                </td>
                <td className='px-6 py-4'>
                  {getStatusBadge(ticket.ticket_status)}
                </td>
                <td className='px-6 py-4 text-right'>
                  <div className='flex items-center justify-end gap-2'>
                    <button
                      type='button'
                      className='p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/10'
                      title='Скасувати'
                    >
                      <Ban size={18} />
                    </button>
                    <button
                      type='button'
                      className='p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/10'
                      title='QR Код'
                    >
                      <QrCode size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TicketsPage
