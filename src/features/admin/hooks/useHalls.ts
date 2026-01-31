import { useState, useCallback } from 'react'
import {
  hallsService,
  type HallSummaryDto,
} from '../../../services/hallsService'
import { bookingService } from '../../../services/bookingService'
import type { Seat } from '../../../types/hall'

export const useHalls = () => {
  const [halls, setHalls] = useState<HallSummaryDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchHalls = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await hallsService.getAll()
      setHalls(data)
    } catch (error) {
      console.error('Error fetching halls:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteHall = async (id: string) => {
    try {
      await hallsService.delete(id)
      await fetchHalls()
      return true
    } catch (error) {
      return false
    }
  }

  return { halls, isLoading, fetchHalls, deleteHall }
}

export const useHallEditor = (refreshHalls: () => void) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [initialSeats, setInitialSeats] = useState<Seat[]>([])

  const loadHallSeats = async (hallId: string) => {
    setIsLoadingData(true)
    try {
      const hallData = await bookingService.getHallById(hallId)
      setInitialSeats(hallData.seats)
      return true
    } catch (error) {
      return false
    } finally {
      setIsLoadingData(false)
    }
  }

  const resetEditor = () => setInitialSeats([])

  const saveHall = async (
    mode: 'create' | 'edit',
    hallId: string | null,
    hallName: string,
    data: {
      rows: number
      cols: number
      technologyIds: string[]
      primarySeatTypeId: string
      seatConfig: { gridX: number; gridY: number; seatTypeId: string }[]
    },
  ) => {
    setIsProcessing(true)
    try {
      let targetHallId = hallId

      if (mode === 'create') {
        const createResult = await hallsService.create(
          hallName,
          data.rows,
          data.cols,
          data.primarySeatTypeId,
          data.technologyIds,
        )
        // Обробка результату створення (інколи API повертає об'єкт, інколи ID)
        targetHallId =
          typeof createResult === 'string'
            ? createResult
            : (createResult as any).id || (createResult as any).value
      } else if (mode === 'edit' && hallId) {
        await hallsService.update(hallId, hallName)
      }

      if (!targetHallId) throw new Error('Failed to resolve Hall ID')

      const currentHallState = await bookingService.getHallById(targetHallId)
      const changesByType: Record<string, string[]> = {}

      currentHallState.seats.forEach(seat => {
        const targetConfig = data.seatConfig.find(
          sc => sc.gridX === seat.gridX && sc.gridY === seat.gridY,
        )
        if (targetConfig && targetConfig.seatTypeId !== seat.seatTypeId) {
          const typeId = targetConfig.seatTypeId
          if (!changesByType[typeId]) changesByType[typeId] = []
          changesByType[typeId].push(seat.id)
        }
      })

      const typeIdsToUpdate = Object.keys(changesByType)
      if (typeIdsToUpdate.length > 0) {
        await Promise.all(
          typeIdsToUpdate.map(typeId =>
            hallsService.batchChangeSeatType(
              targetHallId!,
              changesByType[typeId],
              typeId,
            ),
          ),
        )
      }

      refreshHalls()
      return { success: true }
    } catch (error: any) {
      const msg = error.response?.data?.errors
        ? JSON.stringify(error.response.data.errors)
        : error.message
      return { success: false, error: msg }
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    initialSeats,
    isLoadingData,
    isProcessing,
    loadHallSeats,
    saveHall,
    resetEditor,
  }
}
