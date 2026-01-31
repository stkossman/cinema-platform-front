import { Outlet } from 'react-router-dom'
import Header from '../layouts/components/Header'
import Footer from '../layouts/components/Footer'

const MainLayout = () => {
  return (
    <div className='flex min-h-screen flex-col bg-[var(--bg-main)] text-[var(--text-main)] antialiased selection:bg-[var(--color-primary)]/30'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
