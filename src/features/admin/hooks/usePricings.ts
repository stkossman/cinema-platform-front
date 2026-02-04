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
      const data = await adminPricingsService.getAll()
      setPricings(Array.isArray(data) ? data : [])
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
