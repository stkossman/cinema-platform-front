import { useAdminOrders } from './hooks/useAdminOrders'
import { Search, CreditCard, Loader2, AlertCircle } from 'lucide-react'
import { OrderStatus } from '../../types/order'

const OrdersPage = () => {
  const { orders, isLoading, searchTerm, setSearchTerm } = useAdminOrders()

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Paid:
        return (
          <span className='bg-green-500/10 text-green-500 border-green-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Оплачено
          </span>
        )
      case OrderStatus.Pending:
        return (
          <span className='bg-yellow-500/10 text-yellow-500 border-yellow-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Очікує
          </span>
        )
      case OrderStatus.Cancelled:
        return (
          <span className='bg-red-500/10 text-red-500 border-red-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Скасовано
          </span>
        )
      case OrderStatus.Failed:
        return (
          <span className='bg-red-500/10 text-red-500 border-red-500/20 px-2 py-1 rounded-full text-xs font-bold border'>
            Помилка
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
          <h1 className='text-3xl font-bold text-white'>Замовлення</h1>
          <p className='text-[var(--text-muted)] mt-1'>
            Історія транзакцій та покупок
          </p>
        </div>
      </div>

      <div className='relative'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'
          size={20}
        />
        <input
          type='text'
          placeholder='Пошук за ID...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full rounded-xl bg-[var(--bg-card)] border border-white/5 py-3 pl-10 pr-4 text-white placeholder-[var(--text-muted)] focus:border-[var(--color-primary)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]/50'
        />
      </div>

      {isLoading ? (
        <div className='flex justify-center py-20'>
          <Loader2 className='animate-spin text-[var(--color-primary)]' />
        </div>
      ) : orders.length === 0 ? (
        <div className='text-center py-20 text-[var(--text-muted)] flex flex-col items-center'>
          <AlertCircle className='mb-2 opacity-50' size={32} />
          <p>Замовлень не знайдено (АПІ ще не готове)</p>
        </div>
      ) : (
        <div className='rounded-xl border border-white/5 bg-[var(--bg-card)] overflow-hidden backdrop-blur-sm shadow-xl'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-white/5 text-[var(--text-muted)] font-medium uppercase text-xs tracking-wider'>
              <tr>
                <th className='px-6 py-4'>Дата</th>
                <th className='px-6 py-4'>Фільм</th>
                <th className='px-6 py-4'>Сума</th>
                <th className='px-6 py-4'>Trx ID</th>
                <th className='px-6 py-4'>Статус</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5'>
              {orders.map(order => (
                <tr
                  key={order.id}
                  className='group hover:bg-[var(--bg-hover)] transition-colors'
                >
                  <td className='px-6 py-4 text-[var(--text-muted)] whitespace-nowrap'>
                    {new Date(order.bookingDate).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 text-white'>
                    {order.movieTitle || 'Unknown'}
                  </td>
                  <td className='px-6 py-4 font-bold text-white'>
                    {order.totalAmount} ₴
                  </td>
                  <td className='px-6 py-4 text-xs font-mono text-[var(--text-muted)]'>
                    {order.paymentTransactionId ? (
                      <div className='flex items-center gap-1'>
                        <CreditCard size={12} />{' '}
                        {order.paymentTransactionId.slice(0, 8)}...
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className='px-6 py-4'>{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default OrdersPage
