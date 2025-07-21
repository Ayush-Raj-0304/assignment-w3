import { useState } from 'react'
import DataTable from '../components/DataTable'
import { useNotification } from '../components/NotificationSystem'
import { Plus, UserPlus } from 'lucide-react'

const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', title: 'Software Engineer', role: 'Admin', status: 'Active', avatar: 'JD', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', title: 'Product Manager', role: 'Member', status: 'Inactive', avatar: 'JS', joinDate: '2023-02-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', title: 'UX Designer', role: 'Member', status: 'Active', avatar: 'MJ', joinDate: '2023-03-10' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', title: 'Data Scientist', role: 'Admin', status: 'Active', avatar: 'SW', joinDate: '2023-01-25' },
  { id: 5, name: 'David Brown', email: 'david.brown@example.com', title: 'DevOps Engineer', role: 'Member', status: 'Inactive', avatar: 'DB', joinDate: '2023-04-05' },
  { id: 6, name: 'Emily Davis', email: 'emily.davis@example.com', title: 'Frontend Developer', role: 'Member', status: 'Active', avatar: 'ED', joinDate: '2023-02-14' },
  { id: 7, name: 'Michael Clark', email: 'michael.clark@example.com', title: 'Backend Developer', role: 'Member', status: 'Active', avatar: 'MC', joinDate: '2023-03-22' },
  { id: 8, name: 'Jessica Rodriguez', email: 'jessica.rodriguez@example.com', title: 'QA Engineer', role: 'Member', status: 'Active', avatar: 'JR', joinDate: '2023-01-30' },
  { id: 9, name: 'Chris Lee', email: 'chris.lee@example.com', title: 'Project Manager', role: 'Admin', status: 'Inactive', avatar: 'CL', joinDate: '2023-04-12' },
  { id: 10, name: 'Amanda Martinez', email: 'amanda.martinez@example.com', title: 'Marketing Specialist', role: 'Member', status: 'Active', avatar: 'AM', joinDate: '2023-02-28' },
  { id: 11, name: 'Robert Hernandez', email: 'robert.hernandez@example.com', title: 'Systems Analyst', role: 'Member', status: 'Active', avatar: 'RH', joinDate: '2023-03-18' },
  { id: 12, name: 'Linda Gonzalez', email: 'linda.gonzalez@example.com', title: 'HR Manager', role: 'Admin', status: 'Active', avatar: 'LG', joinDate: '2023-01-08' },
]

export default function Tables({ theme }) {
  const [users, setUsers] = useState(initialUsers)
  const { notify } = useNotification()

  const columns = [
    { 
      key: 'name', 
      label: 'Name',
      render: (user) => (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
            user.status === 'Active' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {user.avatar}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {user.email}
            </p>
          </div>
        </div>
      )
    },
    { key: 'title', label: 'Title' },
    { 
      key: 'role', 
      label: 'Role',
      render: (user) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
          user.role === 'Admin' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
        }`}>
          {user.role}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (user) => (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            user.status === 'Active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
          }`}>
            {user.status}
          </span>
        </div>
      )
    },
    { 
      key: 'joinDate', 
      label: 'Join Date',
      render: (user) => (
        <span className="text-sm">
          {new Date(user.joinDate).toLocaleDateString()}
        </span>
      )
    },
  ]

  const handleEdit = (user) => {
    notify.info(`Edit functionality for ${user.name}`, 'Feature Coming Soon', { duration: 3000 })
  }

  const handleDelete = (user) => {
    setUsers(users.filter(u => u.id !== user.id))
    notify.success(`${user.name} has been removed`, 'User Deleted')
  }

  const handleBulkAction = (action, selectedIndices) => {
    if (action === 'delete') {
      const selectedUsers = selectedIndices.map(index => users[index])
      const updatedUsers = users.filter((_, index) => !selectedIndices.includes(index))
      setUsers(updatedUsers)
      notify.success(`${selectedUsers.length} users have been removed`, 'Bulk Delete Complete')
    }
  }

  const handleAddUser = () => {
    notify.info('Add user functionality', 'Feature Coming Soon', { duration: 3000 })
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient-primary">User Management</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your team members and their permissions
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={handleAddUser}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } shadow-md hover-lift`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Users
              </p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Active Users
              </p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'Active').length}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-lg">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Admins
              </p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'Admin').length}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                New This Month
              </p>
              <p className="text-2xl font-bold">
                {users.filter(u => {
                  const joinDate = new Date(u.joinDate)
                  const now = new Date()
                  return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
                }).length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Data Table */}
      <DataTable 
        columns={columns} 
        data={users} 
        theme={theme}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkAction={handleBulkAction}
      />
    </div>
  )
} 