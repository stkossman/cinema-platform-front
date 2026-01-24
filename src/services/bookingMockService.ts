import type { Hall, Seat, Session } from '../types/hall'
import { SEAT_TYPES } from '../common/constants/seatTypes'

const generateMockSeats = (): Seat[] => {
  const seats: Seat[] = []
  const rows = 8
  const cols = 10

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const isBooked = Math.random() < 0.2
      const isVip = y === rows - 1

      seats.push({
        id: `${x}-${y}`,
        hall_id: 'hall-1',
        seat_type_id: isVip ? SEAT_TYPES.vip.id : SEAT_TYPES.standard.id,
        row_label: String.fromCharCode(65 + y),
        number: x + 1,
        grid_x: x,
        grid_y: y,
        status: isBooked ? 1 : 0,
      })
    }
  }
  return seats
}

const MOCK_HALL: Hall = {
  id: 'hall-1',
  name: 'Red Hall (IMAX)',
  total_capacity: 80,
  rows_count: 8,
  cols_count: 10,
  seats: generateMockSeats(),
}

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    movie_id: 1,
    hall_id: 'hall-1',
    start_time: new Date(today.setHours(10, 0)).toISOString(),
    end_time: new Date(today.setHours(12, 30)).toISOString(),
    price_base: 0,
  },
  {
    id: 's2',
    movie_id: 1,
    hall_id: 'hall-1',
    start_time: new Date(today.setHours(14, 0)).toISOString(),
    end_time: new Date(today.setHours(16, 30)).toISOString(),
    price_base: 0,
  },
  {
    id: 's3',
    movie_id: 1,
    hall_id: 'hall-1',
    start_time: new Date(today.setHours(19, 0)).toISOString(),
    end_time: new Date(today.setHours(21, 30)).toISOString(),
    price_base: 0,
  },
  {
    id: 's4',
    movie_id: 1,
    hall_id: 'hall-1',
    start_time: new Date(tomorrow.setHours(18, 0)).toISOString(),
    end_time: new Date(tomorrow.setHours(20, 30)).toISOString(),
    price_base: 0,
  },
]

export const bookingService = {
  getSessionsByMovieId: async (_movieId: string): Promise<Session[]> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_SESSIONS), 500))
  },
  getHallById: async (_hallId: string): Promise<Hall> => {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_HALL), 500))
  },
}
