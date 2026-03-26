import { Outlet, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Megaphone, 
  Wand2, 
  BarChart3, 
  Settings,
  Bell,
  User
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { path: '/generate', label: 'Generate', icon: Wand2 },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Top Navigation */}
      <header className="h-16 bg-bg-base/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="h-full max-w-[1600px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-primary rounded-md flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-bg-base" />
            </div>
            <span className="text-xl font-bold text-text-primary">AdVidAI</span>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-semibold transition-colors duration-150 ${
                    isActive 
                      ? 'text-accent-primary' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-text-tertiary hover:text-text-primary transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-bg-elevated border border-border flex items-center justify-center">
              <User className="w-5 h-5 text-text-secondary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
