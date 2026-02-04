import { api } from '../lib/axios'
import type { PaginatedResult } from '../types/common'
import { TicketStatus } from '../types/order'

export interface AdminTicketDto {
  id: string
  sessionId: string
  movieTitle: string
  hallName: string
  seatInfo: string
  priceSnapshot: number
  status: TicketStatus
  secretCode: string
}

export const adminTicketsService = {
  getAll: async (
    page = 1,
    search = '',
  ): Promise<PaginatedResult<AdminTicketDto>> => {
    await new Promise(r => setTimeout(r, 600))

    const mockTickets: AdminTicketDto[] = [
      {
        id: '10d8f128-805c-4f0a-bf24-d4d86248f61e',
        sessionId: 'sess-1',
        movieTitle: 'Дюна: Частина друга',
        hallName: 'Red Hall',
        seatInfo: 'Row 5 - Seat 12',
        priceSnapshot: 150,
        status: TicketStatus.Valid,
        secretCode: '10D8F128',
      },
      {
        id: 'cc970d72-7dc7-40ab-9cdc-50942639ef85',
        sessionId: 'sess-1',
        movieTitle: 'Дюна: Частина друга',
        hallName: 'Red Hall',
        seatInfo: 'Row 5 - Seat 13',
        priceSnapshot: 150,
        status: TicketStatus.Used,
        secretCode: 'CC970D72',
      },
    ]

    const filtered = mockTickets.filter(
      t => t.id.includes(search) || t.secretCode.includes(search),
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

  validate: async (id: string): Promise<string> => {
    const response = await api.post(
      `/tickets/${id}/validate`,
      {},
      { responseType: 'text' },
    )
    return response.data
  },
}
