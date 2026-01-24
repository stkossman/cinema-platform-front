import { type Session } from '../../../types/hall'

interface SessionSelectorProps {
  sessions: Session[]
  selectedSession: Session | null
  onSelect: (session: Session) => void
}

const SessionSelector = ({
  sessions,
  selectedSession,
  onSelect,
}: SessionSelectorProps) => {
  const grouped = sessions.reduce(
    (acc, session) => {
      const dateKey = new Date(session.start_time).toDateString()
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(session)
      return acc
    },
    {} as Record<string, Session[]>,
  )

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold text-white'>Оберіть сеанс</h2>
      <div className='space-y-4'>
        {Object.entries(grouped).map(([date, sessionsInDate]) => (
          <div key={date} className='space-y-2'>
            <h3 className='text-sm font-medium text-zinc-400 capitalize'>
              {new Date(date).toLocaleDateString('uk-UA', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h3>
            <div className='flex flex-wrap gap-3'>
              {sessionsInDate.map(session => (
                <button
                  type='button'
                  key={session.id}
                  onClick={() => onSelect(session)}
                  className={`rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                    selectedSession?.id === session.id
                      ? 'bg-white text-black shadow-lg shadow-white/20'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
                >
                  {new Date(session.start_time).toLocaleTimeString('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SessionSelector
