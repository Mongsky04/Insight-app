import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  PieChart, 
  AlertTriangle, 
  Mail, 
  Menu, 
  Search,
  Sparkles,
  Bell,
  Maximize2,
  X
} from 'lucide-react'
import logo from '../assets/logo-insight.png'

const Layout = ({ children }) => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const menuItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: 'Dashboard Overview',
    },
    {
      path: '/segmentation',
      icon: PieChart,
      label: 'Deep Segmentation',
    },
    {
      path: '/early-warning',
      icon: AlertTriangle,
      label: 'Early Warning System',
      badge: true,
    },
    {
      path: '/email-automation',
      icon: Mail,
      label: 'Email Automation CMS',
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-sidebar-dark flex flex-col transition-all duration-300 overflow-hidden`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-center">
          <img src={logo} alt="CustPulse AI" className="h-10 w-auto" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item mb-1 relative ${isActive ? 'sidebar-item-active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* AI Agent Status */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-white font-medium text-sm">AI Agent Status</div>
              <div className="text-xs text-gray-400">Analysis Engine: Online</div>
              <div className="text-xs text-gray-400">Powered by Gemini 2.0</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer, segment, or metrics..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Maximize2 className="w-5 h-5 text-gray-600" />
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">Marketing Lead</div>
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  AU
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
