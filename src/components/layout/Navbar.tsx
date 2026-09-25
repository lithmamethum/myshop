import { NavLink } from 'react-router-dom'
import { ShoppingCart, ShoppingBag, LogIn } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../common/ThemeToggle'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

const navItems: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
]

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50 dark:bg-slate-950">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between p-3 sm:p-4 gap-2">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg sm:text-xl font-bold flex items-center gap-2 shrink-0"
        >
          <ShoppingCart size={20} />
          <span>My Shop</span>
        </NavLink>

        {/* Right cluster */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Text links — hidden on very small screens */}
          <nav className="hidden sm:flex items-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative hover:text-white transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2 sm:gap-3 text-sm">
              <span className="text-slate-300 hidden md:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="text-slate-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
              aria-label="Login"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Login</span>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile sub-nav */}
      <nav className="sm:hidden border-t border-slate-800 flex items-center justify-center gap-6 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}