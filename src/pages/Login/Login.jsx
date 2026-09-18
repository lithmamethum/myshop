import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

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
        <div className="text-5xl mb-3">👤</div>
        <h1 className="text-2xl font-bold mb-1">You're logged in</h1>
        <p className="text-slate-500 mb-6">{user.email}</p>
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
    <div className="max-w-md mx-auto bg-white rounded-lg border border-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
      <p className="text-slate-500 text-sm mb-6">
        Sign in to continue to checkout.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 mb-1 block">
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
          <span className="text-sm font-medium text-slate-700 mb-1 block">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-700"
        >
          Sign In
        </button>
      </form>

      <p className="text-xs text-slate-400 text-center mt-4">
        🔒 Demo only — any email + password (min 4 chars) works.
      </p>
    </div>
  )
}