import { useState, useCallback } from 'react'
import {
  hallsService,
  type HallSummaryDto,
} from '../../../services/hallsService'
import { bookingService } from '../../../services/bookingService'
import type { Seat, Technology } from '../../../types/hall'

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
  const [initialTechnologies, setInitialTechnologies] = useState<Technology[]>(
    [],
  )

  const loadHallSeats = async (hallId: string) => {
    setIsLoadingData(true)
    try {
      const hallData = await bookingService.getHallById(hallId)
      setInitialSeats(hallData.seats)
      setInitialTechnologies(hallData.technologies || [])
      return true
    } catch (error) {
      return false
    } finally {
      setIsLoadingData(false)
    }
  }

  const resetEditor = () => {
    setInitialSeats([])
    setInitialTechnologies([])
  }

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
        targetHallId =
          typeof createResult === 'string'
            ? createResult
            : (createResult as any).id || (createResult as any).value
      } else if (mode === 'edit' && hallId) {
        await Promise.all([
          hallsService.update(hallId, hallName),
          hallsService.updateTechnologies(hallId, data.technologyIds),
        ])
      }

      if (!targetHallId) throw new Error('Failed to resolve Hall ID')

      const currentHallState = await bookingService.getHallById(targetHallId)
      const changesByType: Record<string, string[]> = {}

      currentHallState.seats.forEach((seat: Seat) => {
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
        for (const typeId of typeIdsToUpdate) {
          await hallsService.batchChangeSeatType(
            targetHallId!,
            changesByType[typeId],
            typeId,
          )
          if (typeIdsToUpdate.length > 1) await wait(200)
        }
      }

      await wait(1000)

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
    initialTechnologies,
  }
}
