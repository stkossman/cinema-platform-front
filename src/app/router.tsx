import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AboutPage from '../pages/AboutPage'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../features/admin/AdminDashboard'
import AdminRoute from '../features/auth/AdminRoute'
import MoviePage from '../pages/MoviePage'
import FAQPage from '../pages/FAQPage'
import OffersPage from '../pages/OffersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/register',
        element: <RegisterPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'movies/:id',
        element: <MoviePage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
      {
        path: 'offers',
        element: <OffersPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
])
