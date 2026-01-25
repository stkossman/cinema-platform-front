import { supabase } from '../lib/supabase'
import type { OrderItem } from '../types/order'

export const ordersService = {
  getUserOrders: async (userId: string): Promise<OrderItem[]> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total_amount,
          booking_date,
          status,
          session:sessions (
            start_time,
            movie:movies ( title, img_url ),
            hall:halls ( name )
          ),
          tickets (
            seat:seats ( row_label, number )
          )
        `)
        .eq('user_id', userId)
        .order('booking_date', { ascending: false })

      if (error) throw error
      if (!data) return []

      console.log('User Orders Raw:', data)

      return data.map((order: any) => {
        const seatsList = order.tickets
          ? order.tickets.map(
              (t: any) => `${t.seat?.row_label}-${t.seat?.number}`,
            )
          : []

        let uiStatus: 'active' | 'completed' | 'cancelled' = 'active'

        const sessionDate = new Date(order.session.start_time)
        const now = new Date()

        if (order.status === 3 || order.status === 2) {
          uiStatus = 'cancelled'
        } else if (sessionDate < now) {
          uiStatus = 'completed'
        } else {
          uiStatus = 'active'
        }

        return {
          id: order.id,
          bookingId: order.id.slice(0, 8).toUpperCase(),
          totalPrice: order.total_amount,
          status: uiStatus,

          sessionDate: order.session.start_time,
          movieTitle: order.session.movie?.title || 'Unknown Movie',
          posterUrl: order.session.movie?.img_url || '',
          cinemaHall: order.session.hall?.name || 'Unknown Hall',
          seats: seatsList,
        }
      })
    } catch (error) {
      console.error('Supabase Error (Orders):', error)
      return []
    }
  },
}
