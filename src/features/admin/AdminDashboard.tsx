import { DollarSign, Ticket, Film, TrendingUp } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className='rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm'>
    <div className='flex items-center justify-between'>
      <h3 className='text-sm font-medium text-zinc-400'>{title}</h3>
      <Icon className='h-4 w-4 text-zinc-500' />
    </div>
    <div className='mt-2 flex items-baseline gap-2'>
      <div className='text-2xl font-bold text-white'>{value}</div>
      {trend && <div className='text-xs text-green-500'>{trend}</div>}
    </div>
  </div>
)

const AdminDashboard = () => {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-white'>Огляд</h1>
        <p className='text-zinc-400'>Статистика кінотеатру за сьогодні</p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Продано квитків'
          value='1,234'
          icon={Ticket}
          trend='+12%'
        />
        <StatCard
          title='Дохід'
          value='₴ 45,230'
          icon={DollarSign}
          trend='+8%'
        />
        <StatCard title='Активні фільми' value='12' icon={Film} />
        <StatCard
          title='Відвідуваність'
          value='85%'
          icon={TrendingUp}
          trend='+2%'
        />
      </div>

      <div className='rounded-xl border border-white/10 bg-zinc-900/20 p-8 text-center text-zinc-500 border-dashed h-64 flex items-center justify-center'>
        Тут буде графік продажів або список останніх транзакцій
      </div>
    </div>
  )
}

export default AdminDashboard
