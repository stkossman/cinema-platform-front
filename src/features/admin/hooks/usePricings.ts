import { useState, useCallback, useEffect } from 'react'
import {
  adminPricingsService,
  type PricingDetailsDto,
  type SetPricingRuleDto,
} from '../../../services/adminPricingsService'

export const usePricings = () => {
  const [pricings, setPricings] = useState<PricingDetailsDto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPricings = useCallback(async () => {
    setIsLoading(true)
    try {
      const listData = await adminPricingsService.getAll()

      if (!Array.isArray(listData)) {
        setPricings([])
        return
      }

      const detailedPricings = await Promise.all(
        listData.map(async pricing => {
          try {
            return await adminPricingsService.getById(pricing.id)
          } catch (e) {
            console.warn(`Could not fetch details for ${pricing.name}`, e)
            return pricing
          }
        }),
      )

      setPricings(detailedPricings)
    } catch (error) {
      console.error('Failed to fetch pricings', error)
      setPricings([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createPricing = async (name: string) => {
    try {
      await adminPricingsService.create(name)
      await fetchPricings()
      return { success: true }
    } catch (error: any) {
      const msg = error.response?.data?.title || 'Failed to create pricing'
      return { success: false, error: msg }
    }
  }

  const updateRules = async (id: string, rules: SetPricingRuleDto[]) => {
    try {
      await adminPricingsService.setRules(id, rules)
      await fetchPricings()
      return { success: true }
    } catch (error: any) {
      const msg = error.response?.data?.title || 'Failed to update rules'
      return { success: false, error: msg }
    }
  }

  useEffect(() => {
    fetchPricings()
  }, [fetchPricings])

  return {
    pricings,
    isLoading,
    fetchPricings,
    createPricing,
    updateRules,
  }
}
