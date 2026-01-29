import { api } from '../lib/axios'
import type { Hall, Session } from '../types/hall'

interface SessionDto {
  id: string
  startTime: string
  endTime: string
  status: string
  movieId: string
  movieTitle: string
  hallId: string
  hallName: string
}

interface SeatDto {
  id: string
  row: string
  number: number
  gridX: number
  gridY: number
  status: string
  seatTypeId: string
  seatTypeName: string
}

interface HallDto {
  id: string
  name: string
  capacity: number
  seats: SeatDto[]
}

export const bookingService = {
  getSessionsByMovieId: async (movieId: string): Promise<Session[]> => {
    try {
      const { data } = await api.get<SessionDto[]>(`/sessions/by-date`)

      return data
        .filter(s => s.movieId === movieId)
        .map(s => ({
          id: s.id,
          startTime: s.startTime,
          endTime: s.endTime,
          status: s.status,
          movieId: s.movieId,
          movieTitle: s.movieTitle,
          hallId: s.hallId,
          hallName: s.hallName,
          priceBase: 150,
        }))
    } catch (error) {
      console.error('API Error (Sessions):', error)
      return []
    }
  },

  getHallById: async (hallId: string): Promise<Hall> => {
    try {
      const { data } = await api.get<HallDto>(`/halls/${hallId}`)

      const seats = data.seats || []

      const mappedSeats = seats.map(s => ({
        id: s.id,
        row: s.row,
        number: s.number,
        gridX: s.gridX - 1,
        gridY: s.gridY - 1,
        status: s.status,
        seatTypeId: s.seatTypeId,
        seatTypeName: s.seatTypeName,
      }))

      const maxGridX = mappedSeats.reduce((max, s) => Math.max(max, s.gridX), 0)
      const maxGridY = mappedSeats.reduce((max, s) => Math.max(max, s.gridY), 0)

      return {
        id: data.id,
        name: data.name,
        capacity: data.capacity,
        rowsCount: maxGridY + 1,
        colsCount: maxGridX + 1,
        seats: mappedSeats,
      }
    } catch (error) {
      console.error('API Error (Hall):', error)
      throw error
    }
  },
}
