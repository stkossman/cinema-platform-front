import { supabase } from '../lib/supabase'

export interface PricingLookup {
  id: string
  name: string
}

export const adminPricingsService = {
  getLookups: async (): Promise<PricingLookup[]> => {
    const { data, error } = await supabase
      .from('pricings')
      .select('id, name')
      .order('name')

    if (error) throw error
    return data || []
  },
}
