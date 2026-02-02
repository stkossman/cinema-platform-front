//import { api } from '../lib/axios'
import type { OrderItem } from '../types/order'

export const ordersService = {
  getMyOrders: async (): Promise<OrderItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 800))

    const mockOrders: OrderItem[] = [
      {
        id: '1',
        bookingId: 'ORD-7782',
        totalPrice: 450,
        status: 'active',
        sessionDate: new Date(Date.now() + 86400000).toISOString(),
        movieTitle: 'Dune: Part Two',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        cinemaHall: 'Red Hall',
        seats: ['5-12', '5-13', '5-14'],
      },
      {
        id: '2',
        bookingId: 'ORD-9921',
        totalPrice: 300,
        status: 'completed',
        sessionDate: new Date(Date.now() - 864000000).toISOString(),
        movieTitle: 'Oppenheimer',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        cinemaHall: 'IMAX Hall',
        seats: ['8-10', '8-11'],
      },
      {
        id: '3',
        bookingId: 'ORD-1102',
        totalPrice: 150,
        status: 'cancelled',
        sessionDate: new Date(Date.now() - 200000).toISOString(),
        movieTitle: 'Kung Fu Panda 4',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
        cinemaHall: 'Blue Hall',
        seats: ['3-5'],
      },
    ]

    return mockOrders
  },
}
