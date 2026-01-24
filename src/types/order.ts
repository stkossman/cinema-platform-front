export interface OrderItem {
  id: string
  movieTitle: string
  posterUrl: string
  sessionDate: string
  cinemaHall: string
  seats: string[]
  totalPrice: number
  status: 'active' | 'completed' | 'cancelled'
  bookingId: string
}
