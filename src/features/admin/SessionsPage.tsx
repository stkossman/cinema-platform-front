import { useState, useEffect } from 'react'
import {
  adminSessionsService,
  type SessionDto,
} from '../../services/adminSessionsService'
import {
  Plus,
  Clock,
  Film,
  MonitorPlay,
  Trash2,
  Edit,
  Loader2,
  Calendar,
} from 'lucide-react'
import CreateSessionModal from './components/CreateSessionModal'

const SessionsPage = () => {
  const [sessions, setSessions] = useState<SessionDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const fetchSessions = async () => {
    setIsLoading(true)
    try {
      const data = await adminSessionsService.getAll(1, 100)

      const sorted = data.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
      )
      setSessions(sorted)
    } catch (error) {
      console.error('Failed to fetch sessions', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Ви впевнені, що хочете скасувати цей сеанс?')) return
    try {
      await adminSessionsService.cancel(id)
      fetchSessions()
    } catch (e) {
      alert('Помилка скасування сеансу. Можливо, на нього вже продані квитки.')
    }
  }

  const handleReschedule = async (id: string, currentStart: string) => {
    const currentIso = new Date(currentStart).toISOString().slice(0, 16)
    const newTimeStr = prompt(
      'Введіть новий час (YYYY-MM-DDTHH:MM):',
      currentIso,
    )

    if (!newTimeStr) return

    try {
      const newDate = new Date(newTimeStr)
      if (isNaN(newDate.getTime())) throw new Error('Невірний формат дати')

      await adminSessionsService.reschedule(id, newDate.toISOString())
      fetchSessions()
    } catch (e: any) {
      const msg = e.response?.data?.errors?.Description || e.message
      alert('Помилка переносу: ' + msg)
    }
  }

  const groupedSessions = sessions.reduce(
    (groups, session) => {
      const dateKey = new Date(session.startTime).toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(session)
      return groups
    },
    {} as Record<string, SessionDto[]>,
  )

  return (
    <div className='space-y-8 pb-20'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Розклад сеансів</h1>
          <p className='text-zinc-400 mt-1'>Планування та керування показами</p>
        </div>
        <button
          type='button'
          onClick={() => setIsCreateModalOpen(true)}
          className='flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5'
        >
          <Plus size={18} /> Додати сеанс
        </button>
      </div>

      {isLoading ? (
        <div className='py-20 flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
        </div>
      ) : (
        <div className='space-y-10 animate-in fade-in slide-in-from-bottom-4'>
          {Object.keys(groupedSessions).length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30'>
              <Calendar className='h-12 w-12 text-zinc-600 mb-4' />
              <div className='text-xl font-medium text-white'>
                Сеансів не знайдено
              </div>
              <p className='text-zinc-500 mt-2'>
                Створіть перший сеанс, натиснувши кнопку зверху.
              </p>
            </div>
          )}

          {Object.entries(groupedSessions).map(([dateKey, sessionList]) => {
            const dateObj = new Date(sessionList[0].startTime)
            const isToday =
              new Date().toDateString() === new Date().toDateString()

            return (
              <div key={dateKey} className='relative'>
                <div className='sticky top-0 z-10 flex items-center gap-4 bg-zinc-950/95 py-4 backdrop-blur-md border-b border-white/10 mb-4'>
                  <div
                    className={`text-xl font-bold flex items-center gap-2 ${isToday ? 'text-green-500' : 'text-white'}`}
                  >
                    {dateObj.toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      weekday: 'long',
                    })}
                  </div>
                  {isToday && (
                    <span className='bg-green-500/10 text-green-500 text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider'>
                      Сьогодні
                    </span>
                  )}
                  <div className='h-px bg-white/10 flex-1'></div>
                </div>

                <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                  {sessionList.map(session => {
                    const start = new Date(session.startTime)
                    const end = new Date(session.endTime)
                    const isCancelled = session.status === 'Cancelled'

                    return (
                      <div
                        key={session.id}
                        className={`group relative bg-zinc-900 border rounded-xl p-5 transition-all hover:-translate-y-1 hover:shadow-xl ${isCancelled ? 'border-red-900/30 opacity-70' : 'border-white/5 hover:border-white/20'}`}
                      >
                        {isCancelled && (
                          <div className='absolute top-0 right-0 bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-1 rounded-bl-xl border-b border-l border-red-500/20 uppercase tracking-wider'>
                            Скасовано
                          </div>
                        )}

                        <div className='flex gap-4'>
                          <div className='h-20 w-14 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0 border border-white/5 shadow-inner'>
                            <Film size={20} className='text-zinc-600' />
                          </div>

                          <div className='flex-1 min-w-0'>
                            <h3
                              className='font-bold text-white text-lg truncate pr-6'
                              title={session.movieTitle}
                            >
                              {session.movieTitle}
                            </h3>

                            <div className='flex items-center gap-2 mt-2'>
                              <div className='bg-white/10 px-2 py-1 rounded text-white font-mono text-sm font-bold flex items-center gap-1.5'>
                                <Clock size={12} className='text-zinc-400' />
                                {start.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                              <span className='text-zinc-600 text-xs font-mono'>
                                →{' '}
                                {end.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>

                            <div className='flex flex-wrap items-center gap-3 mt-3 text-sm text-zinc-400'>
                              <div
                                className='flex items-center gap-1.5'
                                title='Зал'
                              >
                                <MonitorPlay size={14} />
                                <span className='truncate max-w-[100px]'>
                                  {session.hallName}
                                </span>
                              </div>
                              <div className='h-3 w-px bg-zinc-700'></div>
                              <div
                                className='text-xs bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-300 border border-white/5 truncate max-w-[120px]'
                                title='Тариф'
                              >
                                {session.pricingName}
                              </div>
                            </div>
                          </div>
                        </div>

                        {!isCancelled && (
                          <div className='absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200'>
                            <button
                              type='button'
                              onClick={() =>
                                handleReschedule(session.id, session.startTime)
                              }
                              className='p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-blue-600 shadow-lg transition-colors'
                              title='Перенести час'
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type='button'
                              onClick={() => handleDelete(session.id)}
                              className='p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-red-600 shadow-lg transition-colors'
                              title='Скасувати сеанс'
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <CreateSessionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          fetchSessions()
        }}
      />
    </div>
  )
}

export default SessionsPage
