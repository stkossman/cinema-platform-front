import { Link } from 'react-router-dom'
import { Home, Film } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 text-center text-zinc-100 selection:bg-red-500/30'>
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[120px]' />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      <div className='relative z-10 flex flex-col items-center px-4 animate-in fade-in zoom-in-95 duration-500'>
        <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-900/50 shadow-2xl shadow-black ring-1 ring-white/10 backdrop-blur-xl'>
          <Film className='h-10 w-10 text-zinc-400' />
        </div>

        <h1 className='text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800'>
          404
        </h1>
        <h2 className='mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl'>
          Сцена не знайдена
        </h2>
        <p className='mt-4 max-w-md text-zinc-400'>
          Здається, ця частина плівки була втрачена в архіві або сеанс
          скасовано.
        </p>

        <Link
          to='/'
          className='group mt-10 flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10 active:scale-95'
        >
          <Home className='h-4 w-4 transition-transform group-hover:-translate-y-0.5' />
          Повернутися в зал
        </Link>
      </div>

      <div className='absolute bottom-8 text-xs font-medium uppercase tracking-widest text-zinc-600'>
        Error Code: MISSING_REEL
      </div>
    </div>
  )
}

export default NotFoundPage
