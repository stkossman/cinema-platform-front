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

  if (user && user.role.toLowerCase() === 'admin') {
    return <Outlet />
  }

  return <Navigate to='/' replace />
}

export default AdminRoute
