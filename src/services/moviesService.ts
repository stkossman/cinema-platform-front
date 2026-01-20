import { type Movie } from '../types/movie'

// temporary mock data
const MOCK_MOVIES: Record<string, Movie> = {
  '1': {
    id: 1,
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    description:
      'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    backdropUrl:
      'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    genres: ['Sci-Fi', 'Adventure'],
    rating: 8.3,
    year: 2024,
    duration: 166,
    director: 'Denis Villeneuve',
  },
}

export const moviesService = {
  getById: async (id: string): Promise<Movie | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const movie = MOCK_MOVIES[id]
        resolve(movie || null)
      }, 600)
    })
  },

  getAll: async (): Promise<Movie[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.values(MOCK_MOVIES))
      }, 600)
    })
  },
}
