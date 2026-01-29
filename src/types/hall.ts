export interface SeatType {
  id: string
  name: string
  description?: string
}

export interface Seat {
  id: string
  row: string
  number: number
  gridX: number
  gridY: number
  status: string
  seatTypeId: string
  seatTypeName: string
}

export interface Hall {
  id: string
  name: string
  capacity: number
  seats: Seat[]
  rowsCount?: number
  colsCount?: number
}

export interface Session {
  id: string
  startTime: string
  endTime: string
  status: string
  movieId: string
  movieTitle: string
  hallId: string
  hallName: string
  priceBase?: number
}

export interface Technology {
  id: string
  name: string
  type: string
}
