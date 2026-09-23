import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { Toast } from '../types'

interface ToastContextValue {
  addToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-slate-900 text-white text-sm px-4 py-3 rounded-md shadow-lg flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]"
          >
            <CheckCircle2 size={16} className="text-green-400 shrink-0" />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}