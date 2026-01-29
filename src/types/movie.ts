export interface Movie {
  id: string
  title: string
  tagline?: string
  description: string
  backdropUrl: string
  genres: string[]
  rating: number
  year: number
  duration: number
  videoUrl?: string | null
}
