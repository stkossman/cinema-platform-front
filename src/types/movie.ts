export interface Movie {
  id: number
  title: string
  tagline: string
  description: string
  backdropUrl: string
  posterUrl?: string
  genres: string[]
  rating: number
  year: number
  duration?: number
  director?: string
}
