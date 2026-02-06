import { api } from '../lib/axios'

export interface Genre {
  id: string
  externalId: number
  name: string
}

let genresCache: Genre[] | null = null

export const genresService = {
  getAll: async (): Promise<Genre[]> => {
    if (genresCache) return genresCache

    const { data } = await api.get<Genre[]>('/genres')
    genresCache = data
    return data
  },

  create: async (externalId: number, name: string): Promise<string> => {
    const { data } = await api.post('/genres', { externalId, name })
    genresCache = null
    return data
  },

  update: async (externalId: number, name: string): Promise<void> => {
    await api.put(`/genres/${externalId}`, { name })
    genresCache = null
  },

  delete: async (externalId: number): Promise<void> => {
    await api.delete(`/genres/${externalId}`)
    genresCache = null
  },
}
