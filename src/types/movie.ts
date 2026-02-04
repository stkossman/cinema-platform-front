export enum MovieStatus {
  ComingSoon = 1,
  Active = 2,
  Archived = 3,
}

export interface Actor {
  name: string
  role?: string
  photoUrl?: string
}

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
  cast: Actor[]
  status: MovieStatus
}

export interface MovieDto {
  id: string
  title: string
  description?: string
  durationMinutes: number
  rating: number
  releaseYear: number
  posterUrl?: string
  backdropUrl?: string
  trailerUrl?: string
  genres: string[]
  cast: Actor[]
  status: number
}

export interface TmdbSearchResult {
  tmdbId: number
  title: string
  year: string
  posterUrl?: string
}

export interface PaginatedResult<T> {
  items: T[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
