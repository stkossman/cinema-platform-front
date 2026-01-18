import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../features/auth/AuthContext'

const AdminRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-black text-white'>
        Завантаження...
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

export default AdminRoute
