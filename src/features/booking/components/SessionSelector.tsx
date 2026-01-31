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
      const dateKey = new Date(session.startTime).toDateString()
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(session)
      return acc
    },
    {} as Record<string, Session[]>,
  )

  return (
    <div className='space-y-6'>
      <h2 className='text-xl font-bold text-white flex items-center gap-2'>
        <span className='w-1 h-6 bg-[var(--color-primary)] rounded-full'></span>
        Оберіть сеанс
      </h2>

      <div className='space-y-6'>
        {Object.entries(grouped).map(([date, sessionsInDate]) => (
          <div key={date} className='space-y-3'>
            <h3 className='text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider pl-1'>
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
                  className={`
                    relative overflow-hidden rounded-xl px-6 py-3 text-sm font-bold transition-all duration-200 border
                    ${
                      selectedSession?.id === session.id
                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30 scale-105'
                        : 'bg-[var(--bg-card)] border-white/5 text-zinc-300 hover:border-[var(--color-primary)]/50 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {new Date(session.startTime).toLocaleTimeString('uk-UA', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}

                  <div
                    className={`text-[10px] mt-0.5 font-medium ${selectedSession?.id === session.id ? 'text-white/80' : 'text-zinc-500'}`}
                  >
                    {session.priceBase || 150} ₴
                  </div>
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
