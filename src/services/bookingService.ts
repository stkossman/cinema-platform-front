import { supabase } from '../lib/supabase'
import type { Hall, Session } from '../types/hall'

export const bookingService = {
  getSessionsByMovieId: async (movieId: string): Promise<Session[]> => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          hall:halls ( name ),
          movie:movies ( title )
        `)
        .eq('movie_id', movieId)
        .gte('start_time', new Date().toISOString())

      if (error) throw error
      if (!data) return []

      console.log('Supabase Sessions:', data)

      return data.map((s: any) => ({
        id: s.id,
        startTime: s.start_time,
        endTime: s.end_time,
        status: s.status.toString(),
        movieId: s.movie_id,
        movieTitle: s.movie?.title || 'Unknown Movie',
        hallId: s.hall_id,
        hallName: s.hall?.name || 'Unknown Hall',
        priceBase: 150,
      }))
    } catch (error) {
      console.error('Supabase Error (Sessions):', error)
      return []
    }
  },

  getHallById: async (hallId: string): Promise<Hall> => {
    try {
      const { data: hallData, error: hallError } = await supabase
        .from('halls')
        .select('*')
        .eq('id', hallId)
        .single()

      if (hallError) throw hallError

      const { data: seatsData, error: seatsError } = await supabase
        .from('seats')
        .select('*, seat_type:seat_types(name)')
        .eq('hall_id', hallId)

      if (seatsError) throw seatsError

      const seats = seatsData || []

      const maxGridX = seats.reduce((max, s) => Math.max(max, s.grid_x), 0)
      const maxGridY = seats.reduce((max, s) => Math.max(max, s.grid_y), 0)

      return {
        id: hallData.id,
        name: hallData.name,
        capacity: hallData.total_capacity,
        rowsCount: maxGridY + 1,
        colsCount: maxGridX + 1,
        seats: seats.map((s: any) => ({
          id: s.id,
          row: s.row_label,
          number: s.number,
          gridX: s.grid_x,
          gridY: s.grid_y,
          status: s.status === 1 ? 'Booked' : 'Available',
          seatTypeId: s.seat_type_id,
          seatTypeName: s.seat_type?.name || 'Standard',
        })),
      }
    } catch (error) {
      console.error('Supabase Error (Hall):', error)
      throw error
    }
  },
}
