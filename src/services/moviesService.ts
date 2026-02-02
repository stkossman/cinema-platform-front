import { supabase } from '../lib/supabase'
import { type Movie } from '../types/movie'

export const moviesService = {
  getById: async (id: string): Promise<Movie | null> => {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null

    return {
      id: data.id,
      title: data.title,
      tagline: data.tagline || 'Кіноподія року',
      description: data.description || 'Опис відсутній.',
      backdropUrl:
        data.backdrop_url || data.img_url || 'https://placehold.co/1920x1080',
      posterUrl: data.poster_url || data.img_url,
      genres: ['Sci-Fi', 'Action'],
      rating: data.rating,
      year: data.release_year || 2024,
      duration: data.duration_minutes,
      videoUrl: data.trailer_url || data.video_url,
      externalId: data.external_id,
    }
  },

  getAll: async (): Promise<Movie[]> => {
    const { data, error } = await supabase.from('movies').select('*')

    if (error || !data) return []

    return data.map((m: any) => ({
      id: m.id,
      title: m.title,
      tagline: m.tagline || '',
      description: m.description || '',
      backdropUrl:
        m.backdrop_url || m.img_url || 'https://placehold.co/1920x1080',
      posterUrl: m.poster_url || m.img_url,
      genres: ['Sci-Fi'], // Тимчасово
      rating: m.rating,
      year: m.release_year || 2024,
      duration: m.duration_minutes,
      videoUrl: m.trailer_url || m.video_url,
      externalId: m.external_id,
    }))
  },
}
