import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User } from 'lucide-react'

export default function Login() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate(from, { replace: true })
  }

  // Already logged in → show account info
  if (user) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg border border-slate-100 p-8 text-center">
        <User
          size={48}
          className="mx-auto text-slate-700 dark:text-slate-300 mb-3"
          strokeWidth={1.5}
        />
        <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
          You're logged in
        </h1>
        <p className="text-slate-500 mb-6 dark:text-slate-400">{user.email}</p>
        <button
          onClick={logout}
          className="w-full bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-700"
        >
          Log Out
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg border border-slate-100 p-8 dark:bg-slate-800 dark:border-slate-700">
      <h1 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
        Welcome back
      </h1>
      <p className="text-slate-500 text-sm mb-6 dark:text-slate-400">
        Sign in to continue to checkout.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block dark:text-slate-300">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block dark:text-slate-300">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:ring-slate-400"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-700"
        >
          Sign In
        </button>
      </form>

      <p className="text-xs text-slate-400 text-center mt-4 dark:text-slate-500">
        Demo only — any email + password (min 4 chars) works.
      </p>
    </div>
  )
}