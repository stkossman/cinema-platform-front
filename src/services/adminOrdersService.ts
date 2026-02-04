import { api } from '../lib/axios'
import type { PaginatedResult } from '../types/common'
import { OrderStatus } from '../types/order'

export interface AdminOrderDto {
  id: string
  userId: string
  userEmail?: string
  movieTitle: string
  totalAmount: number
  status: OrderStatus
  bookingDate: string
  paymentTransactionId?: string
}

export const adminOrdersService = {
  getAll: async (
    page = 1,
    search = '',
  ): Promise<PaginatedResult<AdminOrderDto>> => {
    await new Promise(r => setTimeout(r, 600))

    const mockOrders: AdminOrderDto[] = [
      {
        id: '35549704-c8e9-43f4-a13a-bef68920393b',
        userId: 'user-1',
        userEmail: 'client@example.com',
        movieTitle: 'Дюна: Частина друга',
        totalAmount: 450,
        status: OrderStatus.Paid,
        bookingDate: new Date().toISOString(),
        paymentTransactionId: 'txn_123456',
      },
      {
        id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
        userId: 'user-2',
        userEmail: 'admin@cinema.com',
        movieTitle: 'Avatar 2',
        totalAmount: 900,
        status: OrderStatus.Cancelled,
        bookingDate: new Date(Date.now() - 86400000).toISOString(),
        paymentTransactionId: 'txn_987654',
      },
    ]

    const filtered = mockOrders.filter(
      o =>
        o.id.includes(search) ||
        o.userEmail?.includes(search) ||
        o.paymentTransactionId?.includes(search),
    )

    return {
      items: filtered,
      pageNumber: page,
      totalPages: 1,
      totalCount: filtered.length,
      hasPreviousPage: false,
      hasNextPage: false,
    }
  },

  // Цей метод вже працює на бекенді, можемо використовувати
  cancelOrder: async (id: string): Promise<void> => {
    await api.post(`/orders/${id}/cancel`)
  },
}
