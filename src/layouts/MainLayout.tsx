import { Outlet, useLocation } from 'react-router-dom'
import Header from '../layouts/components/Header'
import Footer from '../layouts/components/Footer'
import ScrollToTop from '../common/components/ScrollToTop'
import { clsx } from 'clsx'

const MainLayout = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <div className='flex min-h-screen flex-col bg-[var(--bg-main)] text-[var(--text-main)] antialiased selection:bg-[var(--color-primary)]/30'>
      <ScrollToTop />
      <Header />
      <main
        className={clsx('flex-1 relative z-0', !isHomePage && 'pt-24 md:pt-28')}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
