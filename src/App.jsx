import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Tables from './pages/Tables'
import Charts from './pages/Charts'
import Calendar from './pages/Calendar'
import Kanban from './pages/Kanban'
import Settings from './pages/Settings'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <Sidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          theme={theme}
        />
        
        <div className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <Header 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard theme={theme} />} />
              <Route path="/tables" element={<Tables theme={theme} />} />
              <Route path="/charts" element={<Charts theme={theme} />} />
              <Route path="/calendar" element={<Calendar theme={theme} />} />
              <Route path="/kanban" element={<Kanban theme={theme} />} />
              <Route path="/settings" element={<Settings theme={theme} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
