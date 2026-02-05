import { api } from '../lib/axios'
import { supabase } from '../lib/supabase'
import type { Session, Hall } from '../types/hall'

export interface CreateOrderResponse {
  orderId: string
  status: string
}

let sessionsCache: Session[] | null = null
let lastFetchTime = 0
const CACHE_DURATION = 60 * 1000

let activeRequest: Promise<Session[]> | null = null

export const bookingService = {
  getSessionsByMovieId: async (movieId: string): Promise<Session[]> => {
    const allSessions = await bookingService.getAllSessions()
    return allSessions.filter(s => s.movieId === movieId)
  },

  getHallById: async (hallId: string): Promise<Hall> => {
    const { data } = await api.get(`/halls/${hallId}`)

    return {
      id: data.id,
      name: data.name,
      capacity: data.capacity || (data.seats ? data.seats.length : 0),
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

    if (activeRequest) {
      return activeRequest
    }

    activeRequest = (async () => {
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
          hallName: s.hallName || 'Зал',
          movieTitle: s.movieTitle || 'Фільм',
          seats: [],
          pricingId: s.pricingId,
        }))

        sessionsCache = mappedSessions
        lastFetchTime = Date.now()
        return mappedSessions
      } catch (error) {
        console.error('Error fetching all sessions:', error)
        return []
      } finally {
        activeRequest = null
      }
    })()

    return activeRequest
  },

  getOccupiedSeatsFromSupabase: async (
    session_id: string,
  ): Promise<string[]> => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('seat_id, ticket_status')
        .eq('session_id', session_id)

      if (error) {
        console.error('Supabase error:', error)
        return []
      }

      if (!data) return []

      return data.map((ticket: any) => ticket.seat_id)
    } catch (e) {
      console.error('Failed to fetch occupied seats from Supabase:', e)
      return []
    }
  },

  lockSeat: async (sessionId: string, seatId: string): Promise<void> => {
    await api.post('/seats/lock', {
      sessionId,
      seatId,
    })
  },

  createOrder: async (
    sessionId: string,
    seatIds: string[],
    paymentToken: string = 'dummy_token',
  ): Promise<CreateOrderResponse> => {
    const { data } = await api.post<CreateOrderResponse>('/orders', {
      sessionId,
      seatIds,
      paymentToken,
    })
    return data
  },

  getSessionDetails: async (sessionId: string): Promise<Session> => {
    const { data } = await api.get<Session>(`/sessions/${sessionId}`)

    const occupiedSeats =
      await bookingService.getOccupiedSeatsFromSupabase(sessionId)

    return {
      id: data.id,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status,
      movieId: data.movieId,
      movieTitle: data.movieTitle,
      hallId: data.hallId,
      hallName: data.hallName,
      priceBase: data.priceBase,
      pricingId: data.pricingId,
      occupiedSeatIds: occupiedSeats,
    } as Session
  },
}
