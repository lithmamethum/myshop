import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="p-1.5 rounded-md hover:bg-slate-800 dark:hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
      title="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}