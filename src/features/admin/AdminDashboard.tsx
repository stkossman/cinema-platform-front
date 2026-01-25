import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { DollarSign, Ticket, Film, TrendingUp } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, trend, isLoading }: any) => (
  <div className='rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm'>
    <div className='flex items-center justify-between'>
      <h3 className='text-sm font-medium text-zinc-400'>{title}</h3>
      <Icon className='h-4 w-4 text-zinc-500' />
    </div>
    <div className='mt-2 flex items-baseline gap-2'>
      {isLoading ? (
        <div className='h-8 w-24 animate-pulse rounded bg-zinc-800' />
      ) : (
        <div className='text-2xl font-bold text-white'>{value}</div>
      )}
      {trend && !isLoading && (
        <div className='text-xs text-green-500'>{trend}</div>
      )}
    </div>
  </div>
)

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    moviesCount: 0,
    ordersCount: 0,
    revenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: moviesCount, error: moviesError } = await supabase
          .from('movies')
          .select('*', { count: 'exact', head: true })

        if (moviesError) throw moviesError

        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('total_amount, status')

        if (ordersError) throw ordersError

        const totalOrders = orders?.length || 0

        const totalRevenue =
          orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) ||
          0

        setStats({
          moviesCount: moviesCount || 0,
          ordersCount: totalOrders,
          revenue: totalRevenue,
        })
      } catch (error) {
        console.error('Error fetching admin stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const formattedRevenue = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(stats.revenue)

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Огляд</h1>
        <p className='text-zinc-400'>Статистика кінотеатру в реальному часі</p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Продано квитків'
          value={stats.ordersCount}
          icon={Ticket}
          trend='N/A'
          isLoading={isLoading}
        />
        <StatCard
          title='Дохід'
          value={formattedRevenue}
          icon={DollarSign}
          trend='N/A'
          isLoading={isLoading}
        />
        <StatCard
          title='Активні фільми'
          value={stats.moviesCount}
          icon={Film}
          isLoading={isLoading}
        />
        <StatCard
          title='Відвідуваність'
          value='~'
          icon={TrendingUp}
          trend='N/A'
          isLoading={isLoading}
        />
      </div>

      <div className='rounded-xl border border-white/10 bg-zinc-900/20 p-8 text-center text-zinc-500 border-dashed h-64 flex items-center justify-center'>
        <p>Тут буде графік продажів за останній тиждень</p>
      </div>
    </div>
  )
}

export default AdminDashboard
