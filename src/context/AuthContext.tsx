import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'
import { STORAGE_KEYS } from '../utils/constants'

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadInitialUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(loadInitialUser)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEYS.USER)
  }, [user])

  const login = (email: string, _password: string) => {
    const name = email.split('@')[0] || 'user'
    setUser({ email, name, loggedInAt: Date.now() })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}