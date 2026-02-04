import { useState } from 'react'
import { Search, Eye, Filter, CreditCard } from 'lucide-react'
import { OrderStatus } from '../../types/order'

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [orders] = useState([
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      user_email: 'ivan@example.com',
      movie_title: 'Dune: Part Two',
      total_amount: 450.0,
      status: 1,
      booking_date: '2024-02-10T14:30:00Z',
      payment_transaction_id: 'tx_stripe_123456789',
    },
    {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      user_email: 'olga@example.com',
      movie_title: 'Madam Web',
      total_amount: 300.0,
      status: 0,
      booking_date: '2024-02-10T15:15:00Z',
      payment_transaction_id: null,
    },
    {
      id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
      user_email: 'admin@cinema.com',
      movie_title: 'Avatar 2',
      total_amount: 900.0,
      status: 2,
      booking_date: '2024-02-09T10:00:00Z',
      payment_transaction_id: 'tx_stripe_987654321',
    },
  ])

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Paid:
        return <span className='... text-green-500 ...'>Paid</span>
      case OrderStatus.Pending:
        return <span className='... text-yellow-500 ...'>Pending</span>
      case OrderStatus.Cancelled:
        return <span className='... text-red-500 ...'>Cancelled</span>
      case OrderStatus.Failed:
        return <span className='... text-red-500 ...'>Failed</span>
      default:
        return <span>{status}</span>
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Замовлення</h1>
          <p className='text-[var(--text-muted)] mt-1'>
            Історія транзакцій та покупок
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            className='p-2.5 rounded-xl border border-white/10 text-[var(--text-muted)] hover:bg-white/5 hover:text-white transition-colors'
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className='relative'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'
          size={20}
        />
        <input
          type='text'
          placeholder='Пошук за ID, поштою або ID транзакції...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full rounded-xl bg-[var(--bg-card)] border border-white/5 py-3 pl-10 pr-4 text-white placeholder-[var(--text-muted)] focus:border-[var(--color-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/50'
        />
      </div>

      <div className='rounded-xl border border-white/5 bg-[var(--bg-card)] overflow-hidden backdrop-blur-sm shadow-xl'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-white/5 text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider'>
            <tr>
              <th className='px-6 py-4'>Дата</th>
              <th className='px-6 py-4'>Користувач</th>
              <th className='px-6 py-4'>Фільм</th>
              <th className='px-6 py-4'>Сума</th>
              <th className='px-6 py-4'>Trx ID</th>
              <th className='px-6 py-4'>Статус</th>
              <th className='px-6 py-4 text-right'>Дії</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-white/5'>
            {orders.map(order => (
              <tr
                key={order.id}
                className='group hover:bg-[var(--bg-hover)] transition-colors'
              >
                <td className='px-6 py-4 text-[var(--text-muted)] whitespace-nowrap'>
                  {new Date(order.booking_date).toLocaleString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className='px-6 py-4 font-medium text-white'>
                  {order.user_email}
                </td>
                <td className='px-6 py-4 text-[var(--text-muted)]'>
                  {order.movie_title}
                </td>
                <td className='px-6 py-4 font-bold text-white'>
                  {order.total_amount.toFixed(2)} ₴
                </td>
                <td className='px-6 py-4 text-xs font-mono text-[var(--text-muted)]'>
                  {order.payment_transaction_id ? (
                    <div className='flex items-center gap-1'>
                      <CreditCard size={12} />{' '}
                      {order.payment_transaction_id.slice(0, 8)}...
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td className='px-6 py-4'>
                  {getStatusBadge(order.status as OrderStatus)}
                </td>
                <td className='px-6 py-4 text-right'>
                  <button
                    type='button'
                    className='p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-colors'
                    title='Деталі'
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersPage
