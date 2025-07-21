import { useState, useRef, useEffect } from 'react'
import { Menu, Sun, Moon, Bell, User, Search, Settings, LogOut, ChevronDown } from 'lucide-react'

export default function Header({ sidebarOpen, setSidebarOpen, theme, toggleTheme }) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const notificationDropdownRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notifications = [
    { id: 1, title: 'New user registered', message: 'John Doe just joined your platform', time: '2 min ago', unread: true },
    { id: 2, title: 'Payment received', message: 'Invoice #1234 has been paid', time: '1 hour ago', unread: true },
    { id: 3, title: 'Server maintenance', message: 'Scheduled maintenance tonight at 2 AM', time: '3 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    } border-b shadow-sm`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={`lg:hidden p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
            theme === 'dark' 
              ? 'hover:bg-gray-700 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Enhanced Search bar */}
        <div className="hidden md:flex flex-1 max-w-md ml-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search anything..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-300 input-focus ${
                searchFocused ? 'ring-2 ring-blue-500/20' : ''
              } ${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50/50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:border-blue-500 backdrop-blur-sm`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`w-5 h-5 transition-colors duration-300 ${
                searchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle with enhanced styling */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover-lift ${
              theme === 'dark'
                ? 'bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-yellow-400'
                : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-blue-600'
            } backdrop-blur-sm`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Enhanced Notifications dropdown */}
          <div className="relative" ref={notificationDropdownRef}>
            <button 
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className={`relative p-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover-lift ${
                theme === 'dark'
                  ? 'bg-gray-700/50 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100/50 hover:bg-gray-200 text-gray-600'
              } backdrop-blur-sm`}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl border overflow-hidden animate-scale-in ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } backdrop-blur-xl`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    You have {unreadCount} unread notifications
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                      notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                    }`}>
                      <div className="flex items-start space-x-3">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center">
                  <button className={`text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-500'
                  }`}>
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced User profile dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover-lift ${
                theme === 'dark'
                  ? 'bg-gray-700/50 hover:bg-gray-600'
                  : 'bg-gray-100/50 hover:bg-gray-200'
              } backdrop-blur-sm`}
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium">John Doe</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Administrator</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  userDropdownOpen ? 'rotate-180' : ''
                }`} />
              </div>
            </button>

            {/* User dropdown menu */}
            {userDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden animate-scale-in ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } backdrop-blur-xl`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium">John Doe</p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    john.doe@example.com
                  </p>
                </div>
                <div className="py-2">
                  <button className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}>
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                    theme === 'dark' 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}>
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <button className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'hover:bg-red-900/50 text-red-400' 
                        : 'hover:bg-red-50 text-red-600'
                    }`}>
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 