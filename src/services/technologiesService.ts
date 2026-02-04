import { api } from '../lib/axios'
import type { Technology } from '../types/hall'

let technologiesCache: Technology[] | null = null

export const technologiesService = {
  getAll: async (): Promise<Technology[]> => {
    if (technologiesCache) {
      return technologiesCache
    }

    const { data } = await api.get<Technology[]>('/technologies')

    technologiesCache = data
    return data
  },

  create: async (name: string, type: string): Promise<string> => {
    const { data } = await api.post('/technologies', { name, type })

    technologiesCache = null
    return data
  },
}
