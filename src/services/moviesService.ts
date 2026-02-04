import { api } from '../lib/axios'
import {
  type Movie,
  type MovieDto,
  type PaginatedResult,
  type TmdbSearchResult,
  MovieStatus,
} from '../types/movie'

let moviesCache: Movie[] | null = null
let lastFetchTime = 0
const CACHE_DURATION = 2 * 60 * 1000
let activeRequest: Promise<Movie[]> | null = null

const mapDtoToMovie = (dto: MovieDto & { TrailerUrl?: string }): Movie => ({
  id: dto.id,
  title: dto.title,
  description: dto.description || 'Опис відсутній',
  backdropUrl:
    dto.backdropUrl || 'https://placehold.co/1920x1080?text=No+Image',
  posterUrl: dto.posterUrl,
  genres: dto.genres || [],
  rating: dto.rating,
  year: dto.releaseYear,
  duration: dto.durationMinutes,
  videoUrl: dto.trailerUrl || dto.TrailerUrl,
  cast: dto.cast || [],
  status: Object.values(MovieStatus).includes(
    dto.status as unknown as MovieStatus,
  )
    ? (dto.status as unknown as MovieStatus)
    : MovieStatus.Active,
})

export const moviesService = {
  getById: async (id: string): Promise<Movie | null> => {
    try {
      const { data } = await api.get<MovieDto>(`/movies/${id}`)
      return mapDtoToMovie(data)
    } catch (error) {
      console.error(`Failed to fetch movie ${id}:`, error)
      return null
    }
  },

  getAll: async (): Promise<Movie[]> => {
    const now = Date.now()

    if (moviesCache && now - lastFetchTime < CACHE_DURATION) {
      return moviesCache
    }

    if (activeRequest) {
      return activeRequest
    }

    activeRequest = (async () => {
      try {
        const { data } = await api.get<PaginatedResult<MovieDto>>('/movies', {
          params: { pageNumber: 1, pageSize: 100 },
        })

        const mappedMovies = data.items.map(mapDtoToMovie)
        moviesCache = mappedMovies
        lastFetchTime = Date.now()
        return mappedMovies
      } catch (error) {
        console.error('Failed to fetch movies:', error)
        return []
      } finally {
        activeRequest = null
      }
    })()

    return activeRequest
  },

  getPaginated: async (
    pageNumber: number,
    pageSize: number,
    searchTerm?: string,
  ): Promise<PaginatedResult<Movie>> => {
    const { data } = await api.get<PaginatedResult<MovieDto>>('/movies', {
      params: { pageNumber, pageSize, searchTerm },
    })

    return {
      ...data,
      items: data.items.map(mapDtoToMovie),
    }
  },

  searchTmdb: async (query: string): Promise<TmdbSearchResult[]> => {
    const { data } = await api.get<TmdbSearchResult[]>('/movies/tmdb-search', {
      params: { query },
    })
    return data
  },

  importMovie: async (tmdbId: number): Promise<string> => {
    const { data } = await api.post<{ movieId: string }>('/movies/import', {
      tmdbId: tmdbId,
    })
    return data.movieId
  },

  delete: async (id: string): Promise<void> => {
    moviesCache = null
    await api.delete(`/movies/${id}`)
  },

  update: async (id: string, movieData: Partial<Movie>): Promise<void> => {
    moviesCache = null
    const requests = []

    if (movieData.title !== undefined) {
      requests.push(
        api.patch(`/movies/${id}/title`, {
          title: movieData.title,
        }),
      )
    }

    if (
      movieData.posterUrl !== undefined ||
      movieData.backdropUrl !== undefined ||
      movieData.videoUrl !== undefined
    ) {
      requests.push(
        api.patch(`/movies/${id}/images`, {
          posterUrl: movieData.posterUrl,
          backdropUrl: movieData.backdropUrl,
          trailerUrl: movieData.videoUrl,
        }),
      )
    }

    if (movieData.description !== undefined) {
      requests.push(
        api.patch(`/movies/${id}/details`, {
          description: movieData.description,
          durationMinutes: movieData.duration,
          rating: movieData.rating,
          releaseYear: movieData.year,
        }),
      )
    }

    if (movieData.status !== undefined) {
      requests.push(
        api.patch(`/movies/${id}/status`, movieData.status, {
          headers: { 'Content-Type': 'application/json' },
        }),
      )
    }

    if (requests.length > 0) {
      await Promise.all(requests)
    }
  },
}
