export interface OrderItem {
  id: string
  bookingId: string
  totalPrice: number
  status: 'active' | 'completed' | 'cancelled'
  sessionDate: string
  movieTitle: string
  posterUrl: string
  cinemaHall: string
  seats: string[]
}
