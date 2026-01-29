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
      tagline: '',
      description: data.description || 'Опис відсутній.',
      backdropUrl: data.img_url || 'https://placehold.co/1920x1080',
      genres: ['Sci-Fi'],
      rating: data.rating,
      year: 2024,
      duration: data.duration_minutes,
      videoUrl: data.video_url,
    }
  },

  getAll: async (): Promise<Movie[]> => {
    const { data, error } = await supabase.from('movies').select('*')

    if (error || !data) return []

    return data.map((m: any) => ({
      id: m.id,
      title: m.title,
      tagline: '',
      description: '',
      backdropUrl: m.img_url,
      genres: [],
      rating: m.rating,
      year: 2024,
      duration: m.duration_minutes,
      videoUrl: m.video_url,
    }))
  },
}
