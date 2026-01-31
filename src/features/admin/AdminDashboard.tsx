import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { DollarSign, Ticket, Film, TrendingUp } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, trend, isLoading }: any) => (
  <div className='rounded-xl border border-white/5 bg-[var(--bg-card)] p-6 backdrop-blur-sm shadow-lg hover:border-[var(--color-primary)]/20 transition-colors'>
    <div className='flex items-center justify-between'>
      <h3 className='text-sm font-medium text-[var(--text-muted)]'>{title}</h3>
      <Icon className='h-4 w-4 text-[var(--color-primary)]' />
    </div>
    <div className='mt-2 flex items-baseline gap-2'>
      {isLoading ? (
        <div className='h-8 w-24 animate-pulse rounded bg-white/5' />
      ) : (
        <div className='text-2xl font-bold text-white'>{value}</div>
      )}
      {trend && !isLoading && (
        <div className='text-xs text-[var(--color-success)]'>{trend}</div>
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
    <div className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Огляд</h1>
        <p className='text-[var(--text-muted)]'>
          Статистика кінотеатру в реальному часі
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Продано квитків'
          value={stats.ordersCount}
          icon={Ticket}
          trend='+12%'
          isLoading={isLoading}
        />
        <StatCard
          title='Дохід'
          value={formattedRevenue}
          icon={DollarSign}
          trend='+5%'
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
          trend='Стабільно'
          isLoading={isLoading}
        />
      </div>

      <div className='rounded-xl border border-dashed border-white/10 bg-[var(--bg-card)]/30 p-8 text-center text-[var(--text-muted)] h-64 flex flex-col items-center justify-center'>
        <TrendingUp className='h-10 w-10 opacity-20 mb-4' />
        <p>Графік продажів з'явиться тут найближчим часом</p>
      </div>
    </div>
  )
}

export default AdminDashboard
