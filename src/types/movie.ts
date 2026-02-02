export interface Movie {
  id: string
  title: string
  description: string
  backdropUrl: string
  posterUrl?: string
  genres: string[]
  rating: number
  year: number
  duration: number
  videoUrl?: string | null
  externalId?: number
}
