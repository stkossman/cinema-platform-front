import { api } from '../lib/axios'
import type { PaginatedResult } from '../types/common'
import type { Hall, Session } from '../types/hall'

let sessionsCache: Session[] | null = null
let lastFetchTime = 0
const CACHE_DURATION = 60 * 1000

interface SessionDto {
  id: string
  startTime: string
  endTime: string
  status: string
  movieId: string
  movieTitle: string
  hallId: string
  hallName: string
  pricingId: string
  pricingName: string
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
  technologies?: { id: string; name: string; type: string }[]
}

export const bookingService = {
  getSessionsByMovieId: async (movieId: string): Promise<Session[]> => {
    const allSessions = await bookingService.getAllSessions()
    return allSessions.filter(s => s.movieId === movieId)
  },

  getHallById: async (hallId: string) => {
    const { data } = await api.get(`/halls/${hallId}`)
    return {
      id: data.id,
      name: data.name,
      rowsCount: data.rows,
      colsCount: data.seatsPerRow,
      seats: data.seats || [],
      technologies: data.technologies || [],
    }
  },

  getAllSessions: async (): Promise<Session[]> => {
    const now = Date.now()

    if (sessionsCache && now - lastFetchTime < CACHE_DURATION) {
      return sessionsCache
    }

    try {
      const { data } = await api.get<any>(
        '/sessions?pageNumber=1&pageSize=1000',
      )

      const sessions = data.items || data

      const mappedSessions = sessions.map((s: any) => ({
        id: s.id,
        movieId: s.movieId,
        hallId: s.hallId,
        startTime: s.startTime,
        priceBase: s.price,
        seats: [],
      }))

      sessionsCache = mappedSessions
      lastFetchTime = now

      return mappedSessions
    } catch (error) {
      console.error('Error fetching all sessions:', error)
      return []
    }
  },

  bookSeats: async (sessionId: string, seatIds: string[], userId: string) => {
    await api.post('/orders', {
      sessionId,
      seatIds,
      userId,
    })
  },
}
