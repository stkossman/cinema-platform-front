import { api } from '../lib/axios'
import type { Seat } from '../types/hall'
import type { PaginatedResult } from '../types/common'

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

export interface HallSummaryDto {
  id: string
  name: string
  capacity: number
}

interface BatchChangeSeatTypeRequest {
  hallId: string
  seatIds: string[]
  newSeatTypeId: string
}

export const hallsService = {
  getAll: async (): Promise<HallSummaryDto[]> => {
    const { data } = await api.get<PaginatedResult<HallSummaryDto>>(
      '/halls?pageNumber=1&pageSize=100',
    )
    return data.items
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

  batchChangeSeatType: async (
    hallId: string,
    seatIds: string[],
    newSeatTypeId: string,
  ) => {
    const payload: BatchChangeSeatTypeRequest = {
      hallId,
      seatIds,
      newSeatTypeId,
    }
    await api.put('/seats/batch-change-type', payload)
  },

  update: async (id: string, name: string) => {
    const payload: UpdateHallRequest = {
      hallId: id,
      name,
    }
    await api.put(`/halls/${id}`, payload)
  },

  delete: async (id: string) => {
    await api.delete(`/halls/${id}`)
  },
}
