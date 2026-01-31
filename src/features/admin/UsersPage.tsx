import { useState, useEffect } from 'react'
import {
  adminUsersService,
  type UserDto,
} from '../../services/adminUsersService'
import {
  Search,
  Loader2,
  User as UserIcon,
  MoreHorizontal,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import ChangeRoleModal from './components/ChangeRoleModal'

const UsersPage = () => {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState<UserDto[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserDto[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserDto | null>(null)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const data = await adminUsersService.getAll()
      setUsers(data)
      setFilteredUsers(data)
    } catch (error) {
      console.error('Failed to fetch users', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase()
    const filtered = users.filter(
      u =>
        u.email.toLowerCase().includes(lowerQuery) ||
        u.firstName.toLowerCase().includes(lowerQuery) ||
        u.lastName.toLowerCase().includes(lowerQuery),
    )
    setFilteredUsers(filtered)
  }, [searchQuery, users])

  const handleEditClick = (user: UserDto) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleRoleChange = async (
    userId: string,
    newRole: 'Admin' | 'User',
  ) => {
    try {
      await adminUsersService.changeRole(userId, newRole)
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, role: newRole } : u)),
      )
      alert(`Роль користувача успішно змінено на ${newRole}`)
    } catch (error: any) {
      const msg = error.response?.data || 'Помилка зміни ролі'
      alert(msg)
      throw error
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Користувачі</h1>
          <p className='text-zinc-400 mt-1'>Управління доступом та ролями</p>
        </div>
        <div className='text-sm text-zinc-500'>
          Всього: <span className='text-white font-bold'>{users.length}</span>
        </div>
      </div>

      <div className='relative'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500'
          size={20}
        />
        <input
          type='text'
          placeholder="Пошук за ім'ям або email..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='w-full rounded-xl bg-zinc-900 border border-white/5 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20'
        />
      </div>

      {isLoading ? (
        <div className='flex justify-center py-20'>
          <Loader2 className='animate-spin text-zinc-500 h-8 w-8' />
        </div>
      ) : (
        <div className='rounded-xl border border-white/5 bg-zinc-900/50 overflow-hidden backdrop-blur-sm'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-white/5 text-zinc-400 font-medium uppercase text-xs tracking-wider'>
              <tr>
                <th className='px-6 py-4'>Користувач</th>
                <th className='px-6 py-4'>Роль</th>
                <th className='px-6 py-4 text-right'>Дії</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-white/5'>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className='px-6 py-12 text-center text-zinc-500'
                  >
                    Користувачів не знайдено
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const isMe = currentUser?.id === user.id
                  const isAdmin = user.role === 'Admin'
                  const initials = (
                    user.firstName[0] + user.lastName[0]
                  ).toUpperCase()

                  return (
                    <tr
                      key={user.id}
                      className='group hover:bg-white/[0.02] transition-colors'
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-4'>
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white shadow-inner ${isAdmin ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-zinc-700'}`}
                          >
                            {initials}
                          </div>
                          <div>
                            <div className='font-bold text-white flex items-center gap-2'>
                              {user.firstName} {user.lastName}
                              {isMe && (
                                <span className='text-[10px] bg-white/10 px-1.5 rounded text-zinc-300'>
                                  Ви
                                </span>
                              )}
                            </div>
                            <div className='text-zinc-500 text-xs'>
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        {isAdmin ? (
                          <span className='inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/20'>
                            <ShieldCheck size={12} /> Admin
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-3 py-1 text-xs font-bold text-zinc-400 border border-zinc-500/20'>
                            <UserIcon size={12} /> User
                          </span>
                        )}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button
                          type='button'
                          onClick={() => handleEditClick(user)}
                          disabled={isMe}
                          className='p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all'
                          title={
                            isMe
                              ? 'Ви не можете змінити свою роль'
                              : 'Змінити роль'
                          }
                        >
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      <ChangeRoleModal
        isOpen={isModalOpen}
        user={editingUser}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRoleChange}
      />
    </div>
  )
}

export default UsersPage
