import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const routeNames = {
  '/': 'Dashboard',
  '/tables': 'Tables',
  '/charts': 'Charts',
  '/calendar': 'Calendar',
  '/kanban': 'Kanban',
  '/settings': 'Settings'
}

export default function Breadcrumbs({ theme }) {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link 
        to="/" 
        className={`flex items-center space-x-1 transition-colors duration-200 ${
          theme === 'dark' 
            ? 'text-gray-400 hover:text-white' 
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const displayName = routeNames[routeTo] || name.charAt(0).toUpperCase() + name.slice(1)

        return (
          <div key={name} className="flex items-center space-x-2">
            <ChevronRight className={`w-4 h-4 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`} />
            {isLast ? (
              <span className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {displayName}
              </span>
            ) : (
              <Link 
                to={routeTo}
                className={`transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {displayName}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
} 