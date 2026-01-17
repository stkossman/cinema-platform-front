import { Outlet } from 'react-router-dom'
import Header from '../layouts/components/Header'

const MainLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-red-500/30'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
