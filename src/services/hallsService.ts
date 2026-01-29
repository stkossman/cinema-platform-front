import { api } from '../lib/axios'
import type { Seat } from '../types/hall'

interface CreateSeatDto {
  row: string
  number: number
  gridX: number
  gridY: number
  seatTypeId: string
}

interface CreateHallRequest {
  name: string
  rows: number
  seatsPerRow: number
  seatTypeId: string
  technologyIds: string[]
}

interface UpdateHallRequest {
  hallId: string
  name: string
}

interface HallSummaryDto {
  id: string
  name: string
  capacity: number
}

export const hallsService = {
  getAll: async (): Promise<HallSummaryDto[]> => {
    const { data } = await api.get<HallSummaryDto[]>('/halls')
    return data
  },

  delete: async (id: string) => {
    await api.delete(`/halls/${id}`)
  },

  create: async (
    name: string,
    rows: number,
    seatsPerRow: number,
    seatTypeId: string,
    technologyIds: string[],
  ) => {
    const payload: CreateHallRequest = {
      name,
      rows,
      seatsPerRow,
      seatTypeId,
      technologyIds,
    }

    const { data } = await api.post('/halls', payload)
    return data
  },

  update: async (id: string, name: string) => {
    const payload: UpdateHallRequest = {
      hallId: id,
      name,
    }
    await api.put(`/halls/${id}`, payload)
  },
}
