import { useState, useMemo } from 'react'
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Eye,
  Download,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw
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
  { id: 1, user: 'John Doe', action: 'placed an order', time: '2 minutes ago', type: 'order', avatar: 'JD' },
  { id: 2, user: 'Jane Smith', action: 'registered', time: '5 minutes ago', type: 'user', avatar: 'JS' },
  { id: 3, user: 'Mike Johnson', action: 'made a payment', time: '10 minutes ago', type: 'payment', avatar: 'MJ' },
  { id: 4, user: 'Sarah Wilson', action: 'left a review', time: '15 minutes ago', type: 'review', avatar: 'SW' },
  { id: 5, user: 'Alex Chen', action: 'updated profile', time: '1 hour ago', type: 'user', avatar: 'AC' },
]

const quickStats = [
  { label: 'Active Sessions', value: '1,429', trend: '+12.5%', color: 'text-blue-500' },
  { label: 'Conversion Rate', value: '3.24%', trend: '+0.3%', color: 'text-green-500' },
  { label: 'Avg. Order Value', value: '$127', trend: '-2.1%', color: 'text-red-500' },
]

export default function Dashboard({ theme }) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { filteredData, totalUsers, totalRevenue, totalOrders, growth } = useMemo(() => {
    const days = parseInt(selectedPeriod.replace('d', ''));
    const startDate = subDays(new Date(), days);
    
    const data = allChartData.filter(d => new Date(d.date) >= startDate);
    
    const totals = data.reduce((acc, curr) => {
      acc.users += curr.users;
      acc.revenue += curr.revenue;
      acc.orders += curr.orders;
      return acc;
    }, { users: 0, revenue: 0, orders: 0 });

    // Calculate growth (simplified)
    const growth = {
      users: 12.5,
      revenue: 8.2,
      orders: 15.3,
      overall: 23.5
    };

    return { 
      filteredData: data,
      totalUsers: totals.users,
      totalRevenue: totals.revenue,
      totalOrders: totals.orders,
      growth
    };
  }, [selectedPeriod]);

  const stats = [
    { 
      name: 'Total Users', 
      value: totalUsers.toLocaleString(), 
      change: `+${growth.users}%`, 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      isPositive: true 
    },
    { 
      name: 'Revenue', 
      value: `$${totalRevenue.toLocaleString()}`, 
      change: `+${growth.revenue}%`, 
      icon: DollarSign, 
      color: 'from-green-500 to-green-600',
      isPositive: true 
    },
    { 
      name: 'Orders', 
      value: totalOrders.toLocaleString(), 
      change: `+${growth.orders}%`, 
      icon: ShoppingCart, 
      color: 'from-purple-500 to-purple-600',
      isPositive: true 
    },
    { 
      name: 'Growth', 
      value: `${growth.overall}%`, 
      change: '+2.3%', 
      icon: TrendingUp, 
      color: 'from-orange-500 to-orange-600',
      isPositive: true 
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient-primary">Dashboard Overview</h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={handleRefresh}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-white hover:bg-gray-50 text-gray-700'
            } shadow-md hover-lift`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-4 py-2 rounded-xl border-0 shadow-md transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={stat.name} 
            className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover-lift animate-slide-up ${
              theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
            } backdrop-blur-sm shadow-lg border ${
              theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient background overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <button className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}>
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.name}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    from last period
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className={`p-6 rounded-2xl ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
      } backdrop-blur-sm shadow-lg border ${
        theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
      } hover-lift transition-all duration-300`}>
        <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
              <p className="text-xs text-green-500 mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Revenue
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                fontSize={12}
              />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Growth</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Users
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                fontSize={12}
              />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '12px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#10B981" 
                fill="url(#userGradient)" 
                strokeWidth={3}
              />
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Chart */}
        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Orders by Day</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="name" 
                stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                fontSize={10}
              />
              <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} fontSize={10} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                  border: theme === 'dark' ? '1px solid #374151' : '1px solid #E5E7EB',
                  borderRadius: '8px',
                  color: theme === 'dark' ? '#F9FAFB' : '#111827'
                }}
              />
              <Bar dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
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
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`p-6 rounded-2xl transition-all duration-300 hover-lift ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
        } backdrop-blur-sm shadow-lg border ${
          theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4 max-h-48 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 group">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-transform duration-200 group-hover:scale-110 ${
                  activity.type === 'order' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' :
                  activity.type === 'user' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300' :
                  activity.type === 'payment' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300'
                }`}>
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.user}</p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {activity.action}
                  </p>
                </div>
                <span className={`text-xs flex-shrink-0 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
          <button className={`mt-4 w-full py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            theme === 'dark' 
              ? 'text-blue-400 hover:bg-blue-900/50' 
              : 'text-blue-600 hover:bg-blue-50'
          }`}>
            View All Activity
          </button>
        </div>
      </div>
    </div>
  )
} 