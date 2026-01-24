export interface SeatType {
  id: string
  name: string
  price: number
  color: string
}

export interface Seat {
  id: string
  hall_id: string
  seat_type_id: string
  row_label: string
  number: number
  grid_x: number
  grid_y: number
  status: number
}

export interface Hall {
  id: string
  name: string
  total_capacity: number
  rows_count: number
  cols_count: number
  seats: Seat[]
}

export interface Session {
  id: string
  movie_id: number | string
  hall_id: string
  start_time: string
  end_time: string
  price_base: number
}
