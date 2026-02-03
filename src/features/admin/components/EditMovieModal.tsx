import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { moviesService } from '../../../services/moviesService'
import type { Movie } from '../../../types/movie'
import Input from '../../../common/components/Input'

interface EditMovieModalProps {
  isOpen: boolean
  movie: Movie | null
  onClose: () => void
  onSuccess: () => void
}

const EditMovieModal = ({
  isOpen,
  movie,
  onClose,
  onSuccess,
}: EditMovieModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    backdropUrl: '',
    videoUrl: '',
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        description: movie.description,
        posterUrl: movie.posterUrl || '',
        backdropUrl: movie.backdropUrl,
        videoUrl: movie.videoUrl || '',
      })
    }
  }, [movie])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!movie) return

    setIsSaving(true)
    try {
      await moviesService.update(movie.id, {
        ...formData,
        duration: movie.duration,
        rating: movie.rating,
        year: movie.year,
      })

      onSuccess()
      onClose()
    } catch (error) {
      console.error(error)
      alert('Помилка при оновленні фільму')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen || !movie) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in'>
      <div className='w-full max-w-2xl bg-[var(--bg-card)] border border-white/10 rounded-xl shadow-2xl overflow-hidden'>
        <div className='flex items-center justify-between border-b border-white/10 p-6'>
          <h2 className='text-xl font-bold text-white'>Редагувати фільм</h2>
          <button
            type='button'
            onClick={onClose}
            className='text-[var(--text-muted)] hover:text-white'
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <Input
            label='Назва'
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />

          <div className='space-y-1.5'>
            <label className='text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1'>
              Опис
            </label>
            <textarea
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full rounded-xl border border-white/10 bg-[var(--bg-main)] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] min-h-[100px]'
            />
          </div>

          <Input
            label='Poster URL'
            value={formData.posterUrl}
            onChange={e =>
              setFormData({ ...formData, posterUrl: e.target.value })
            }
          />
          <Input
            label='Backdrop URL'
            value={formData.backdropUrl}
            onChange={e =>
              setFormData({ ...formData, backdropUrl: e.target.value })
            }
          />
          <Input
            label='Trailer URL (YouTube)'
            value={formData.videoUrl}
            onChange={e =>
              setFormData({ ...formData, videoUrl: e.target.value })
            }
          />

          <div className='flex justify-end gap-3 pt-4 mt-6 border-t border-white/10'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 rounded-lg text-sm font-bold text-[var(--text-muted)] hover:text-white transition-colors'
            >
              Скасувати
            </button>
            <button
              type='submit'
              disabled={isSaving}
              className='flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-lg disabled:opacity-50'
            >
              {isSaving && <Loader2 className='animate-spin' size={16} />}
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMovieModal
