import { useAdminTickets } from './hooks/useAdminTickets'
import { Search, Loader2, CheckCircle2 } from 'lucide-react'
import { TicketStatus } from '../../types/order'

const TicketsPage = () => {
  const { tickets, isLoading, searchTerm, setSearchTerm, validateTicket } =
    useAdminTickets()

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.Valid:
        return (
          <span className='bg-blue-500/10 text-blue-500 border-blue-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Активний
          </span>
        )
      case TicketStatus.Used:
        return (
          <span className='bg-gray-500/10 text-gray-500 border-gray-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Використано
          </span>
        )
      case TicketStatus.Refunded:
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
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full rounded-xl bg-[var(--bg-card)] border border-white/5 py-3 pl-10 pr-4 text-white placeholder-[var(--text-muted)] focus:border-[var(--color-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/50'
        />
      </div>

      {isLoading ? (
        <div className='flex justify-center py-20'>
          <Loader2 className='animate-spin text-[var(--color-primary)]' />
        </div>
      ) : tickets.length === 0 ? (
        <div className='text-center py-20 text-[var(--text-muted)]'>
          Квитків не знайдено (або API недоступне)
        </div>
      ) : (
        <div className='rounded-xl border border-white/5 bg-[var(--bg-card)] overflow-hidden backdrop-blur-sm shadow-xl'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-white/5 text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider'>
              <tr>
                <th className='px-6 py-4'>ID</th>
                <th className='px-6 py-4'>Фільм / Зал</th>
                <th className='px-6 py-4'>Місце</th>
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
                  <td className='px-6 py-4 font-mono text-[var(--text-muted)] text-xs'>
                    {ticket.id.slice(0, 8)}...
                  </td>
                  <td className='px-6 py-4 text-white'>
                    <div className='font-bold'>{ticket.movieTitle}</div>
                    <div className='text-xs text-[var(--text-muted)]'>
                      {ticket.hallName}
                    </div>
                  </td>
                  <td className='px-6 py-4 font-bold text-[var(--color-primary)]'>
                    {ticket.seatInfo}
                  </td>
                  <td className='px-6 py-4'>{getStatusBadge(ticket.status)}</td>
                  <td className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      {ticket.status === TicketStatus.Valid && (
                        <button
                          type='button'
                          onClick={() => validateTicket(ticket.id)}
                          className='p-2 rounded-lg text-[var(--color-success)] hover:bg-[var(--color-success)]/10'
                          title='Сканувати (Валідувати)'
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TicketsPage
