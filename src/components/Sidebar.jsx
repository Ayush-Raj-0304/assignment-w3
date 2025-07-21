import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  Calendar, 
  Kanban, 
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Zap
} from 'lucide-react'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard, 
    badge: null,
    color: 'text-blue-500' 
  },
  { 
    name: 'Tables', 
    href: '/tables', 
    icon: Table, 
    badge: { text: '12', color: 'bg-green-500' },
    color: 'text-purple-500' 
  },
  { 
    name: 'Charts', 
    href: '/charts', 
    icon: BarChart3, 
    badge: null,
    color: 'text-orange-500' 
  },
  { 
    name: 'Calendar', 
    href: '/calendar', 
    icon: Calendar, 
    badge: { text: '3', color: 'bg-red-500' },
    color: 'text-pink-500' 
  },
  { 
    name: 'Kanban', 
    href: '/kanban', 
    icon: Kanban, 
    badge: null,
    color: 'text-indigo-500' 
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings, 
    badge: null,
    color: 'text-gray-500' 
  },
]

export default function Sidebar({ open, setOpen, collapsed, setCollapsed, theme }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setOpen(false)} 
        />
        <div className={`fixed inset-y-0 left-0 w-64 ${
          theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
        } backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-in-out animate-slide-up`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gradient-primary">AdminPro</h2>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Dashboard v2.0
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3 mb-2 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] hover-lift ${
                    isActive
                      ? `bg-gradient-primary text-white shadow-lg`
                      : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 ${
                      isActive ? 'text-white' : item.color
                    }`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.badge.color} text-white`}>
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
          
          {/* Quick actions */}
          <div className="absolute bottom-6 left-3 right-3">
            <div className={`p-4 rounded-xl border-2 border-dashed ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
            } backdrop-blur-sm`}>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium">Upgrade to Pro</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Get premium features
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:block fixed inset-y-0 left-0 z-40 ${
        collapsed ? 'w-20' : 'w-72'
      } transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-xl shadow-2xl border-r ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}>
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient-primary">AdminPro</h2>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Dashboard v2.0
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 hover-lift ${
                theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${collapsed ? 'px-3 pt-6' : 'px-4 pt-6'}`}>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center justify-between ${
                    collapsed ? 'px-3 py-3 mb-2' : 'px-4 py-3 mb-2'
                  } text-sm font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] hover-lift ${
                    isActive
                      ? `bg-gradient-primary text-white shadow-lg`
                      : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                  title={collapsed ? item.name : ''}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 ${
                      isActive ? 'text-white' : item.color
                    }`} />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.badge.color} text-white animate-pulse`}>
                      {item.badge.text}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 ${item.badge.color} rounded-full animate-pulse`}></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Quick actions - Desktop */}
          {!collapsed && (
            <div className="p-4">
              <div className={`p-4 rounded-xl border-2 border-dashed ${
                theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
              } backdrop-blur-sm hover-lift transition-all duration-300`}>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Upgrade to Pro</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Get premium features
                    </p>
                  </div>
                </div>
                <button className="mt-3 w-full py-2 px-4 bg-gradient-primary text-white text-sm font-medium rounded-lg hover:scale-105 transition-transform duration-200">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 