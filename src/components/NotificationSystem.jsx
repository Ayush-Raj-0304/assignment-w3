import React, { useState, useEffect, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const NotificationContext = React.createContext()

let notificationId = 0

const notificationTypes = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300',
    iconClassName: 'text-green-400'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300',
    iconClassName: 'text-red-400'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-700 dark:text-yellow-300',
    iconClassName: 'text-yellow-400'
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/50 dark:border-blue-700 dark:text-blue-300',
    iconClassName: 'text-blue-400'
  }
}

function Notification({ notification, onRemove }) {
  const { type, title, message, id, duration = 5000 } = notification
  const config = notificationTypes[type] || notificationTypes.info
  const Icon = config.icon

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onRemove])

  return (
    <div className={`
      max-w-sm w-full border rounded-lg shadow-lg p-4 mb-4 transform transition-all duration-300 ease-in-out
      animate-slide-up hover-lift backdrop-blur-sm
      ${config.className}
    `}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${config.iconClassName}`} />
        </div>
        <div className="ml-3 w-0 flex-1">
          {title && (
            <p className="text-sm font-semibold mb-1">
              {title}
            </p>
          )}
          <p className="text-sm opacity-90">
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => onRemove(id)}
            className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const id = ++notificationId
    const newNotification = { ...notification, id }
    setNotifications(prev => [newNotification, ...prev])
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  const notify = {
    success: (message, title, options = {}) => addNotification({ type: 'success', message, title, ...options }),
    error: (message, title, options = {}) => addNotification({ type: 'error', message, title, ...options }),
    warning: (message, title, options = {}) => addNotification({ type: 'warning', message, title, ...options }),
    info: (message, title, options = {}) => addNotification({ type: 'info', message, title, ...options })
  }

  return (
    <NotificationContext.Provider value={{ notify, clearAll }}>
      {children}
      <div className="fixed top-4 right-4 z-50 max-h-screen overflow-hidden">
        <div className="space-y-2">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
} 