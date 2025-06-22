import { useState, useMemo } from 'react'
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Eye,
  Download,
  Activity
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { subDays, format } from 'date-fns'

const generateChartData = () => {
  const data = [];
  const today = new Date();
  for (let i = 90; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: format(date, 'yyyy-MM-dd'),
      name: format(date, 'MMM d'),
      users: Math.floor(Math.random() * 200) + 100,
      revenue: Math.floor(Math.random() * 1000) + 500,
      orders: Math.floor(Math.random() * 50) + 20,
    });
  }
  return data;
};

const allChartData = generateChartData();

const pieData = [
  { name: 'Desktop', value: 400, color: '#3B82F6' },
  { name: 'Mobile', value: 300, color: '#10B981' },
  { name: 'Tablet', value: 200, color: '#F59E0B' },
]

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'placed an order', time: '2 minutes ago', type: 'order' },
  { id: 2, user: 'Jane Smith', action: 'registered', time: '5 minutes ago', type: 'user' },
  { id: 3, user: 'Mike Johnson', action: 'made a payment', time: '10 minutes ago', type: 'payment' },
  { id: 4, user: 'Sarah Wilson', action: 'left a review', time: '15 minutes ago', type: 'review' },
]

export default function Dashboard({ theme }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  const { filteredData, totalUsers, totalRevenue, totalOrders } = useMemo(() => {
    const days = parseInt(selectedPeriod.replace('d', ''));
    const startDate = subDays(new Date(), days);
    
    const data = allChartData.filter(d => new Date(d.date) >= startDate);
    
    const totals = data.reduce((acc, curr) => {
      acc.users += curr.users;
      acc.revenue += curr.revenue;
      acc.orders += curr.orders;
      return acc;
    }, { users: 0, revenue: 0, orders: 0 });

    return { 
      filteredData: data,
      totalUsers: totals.users,
      totalRevenue: totals.revenue,
      totalOrders: totals.orders,
    };
  }, [selectedPeriod]);

  const stats = [
    { name: 'Total Users', value: totalUsers.toLocaleString(), change: '+12%', icon: Users, color: 'bg-blue-500' },
    { name: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+8%', icon: DollarSign, color: 'bg-green-500' },
    { name: 'Orders', value: totalOrders.toLocaleString(), change: '+15%', icon: ShoppingCart, color: 'bg-purple-500' },
    { name: 'Growth', value: '23.5%', change: '+2.3%', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className={`mt-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-3 py-2 rounded-lg border transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.name}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
              <span className={`ml-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                from last period
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
              <Area type="monotone" dataKey="users" stroke="#10B981" fill="#10B981" fillOpacity={0.3} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Orders by Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
              />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
              <Bar dataKey="orders" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                theme === 'dark' ? 'bg-gray-700' : 
                (activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'user' ? 'bg-green-100 text-green-600' :
                activity.type === 'payment' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600')
              } ${
                theme === 'dark' ? 
                (activity.type === 'order' ? 'text-blue-300' :
                activity.type === 'user' ? 'text-green-300' :
                activity.type === 'payment' ? 'text-purple-300' :
                'text-orange-300') : ''
              }`}>
                {activity.type === 'order' && <ShoppingCart className="w-4 h-4" />}
                {activity.type === 'user' && <Users className="w-4 h-4" />}
                {activity.type === 'payment' && <DollarSign className="w-4 h-4" />}
                {activity.type === 'review' && <Activity className="w-4 h-4" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.user}</p>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {activity.action}
                </p>
              </div>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 