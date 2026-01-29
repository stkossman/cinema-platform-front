import { api } from '../lib/axios'
import { type SeatType } from '../types/hall'

export const seatTypesService = {
  getAll: async (): Promise<SeatType[]> => {
    const { data } = await api.get<SeatType[]>('/seattypes')
    return data
  },
}
