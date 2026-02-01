import { useState, useEffect } from 'react'
// import { supabase } from '../../../lib/supabase'
import { technologiesService } from '../../../services/technologiesService'
import { seatTypesService } from '../../../services/seatTypesService'
import type { Seat, SeatType, Technology } from '../../../types/hall'

export const useHallBuilder = (
  initialSeats: Seat[] = [],
  initialRows = 5,
  initialCols = 8,
  initialTechIds: string[] = [],
) => {
  const [rows, setRows] = useState(initialRows)
  const [cols, setCols] = useState(initialCols)

  const [availableSeatTypes, setAvailableSeatTypes] = useState<SeatType[]>([])
  const [availableTechnologies, setAvailableTechnologies] = useState<
    Technology[]
  >([])

  const [selectedPaintType, setSelectedPaintType] = useState<SeatType | null>(
    null,
  )
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([])
  const [gridConfig, setGridConfig] = useState<Map<string, string>>(new Map())

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesData, techData] = await Promise.all([
          seatTypesService.getAll(),
          technologiesService.getAll(),
        ])

        if (typesData) {
          setAvailableSeatTypes(typesData)
          const standard = typesData.find(t =>
            t.name.toLowerCase().includes('standard'),
          )
          setSelectedPaintType(standard || typesData[0])
        }

        if (techData) {
          setAvailableTechnologies(techData)
        }
      } catch (error) {
        console.error('Failed to load builder data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (initialTechIds.length > 0) {
      setSelectedTechIds(initialTechIds)
    } else {
      setSelectedTechIds([])
    }
  }, [initialTechIds])

  useEffect(() => {
    if (initialSeats.length > 0) {
      const maxX = Math.max(...initialSeats.map(s => s.gridX))
      const maxY = Math.max(...initialSeats.map(s => s.gridY))
      setCols(maxX + 1)
      setRows(maxY + 1)

      const newMap = new Map<string, string>()
      initialSeats.forEach(s => {
        newMap.set(`${s.gridX}-${s.gridY}`, s.seatTypeId)
      })
      setGridConfig(newMap)
    }
  }, [initialSeats])

  const toggleTech = (id: string) => {
    setSelectedTechIds(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id],
    )
  }

  const handleCellClick = (x: number, y: number) => {
    if (!selectedPaintType) return
    const key = `${x}-${y}`
    setGridConfig(prev => {
      const newMap = new Map(prev)
      newMap.set(key, selectedPaintType.id)
      return newMap
    })
  }

  return {
    rows,
    setRows,
    cols,
    setCols,
    availableSeatTypes,
    availableTechnologies,
    selectedPaintType,
    setSelectedPaintType,
    selectedTechIds,
    toggleTech,
    gridConfig,
    handleCellClick,
    isLoading,
  }
}
