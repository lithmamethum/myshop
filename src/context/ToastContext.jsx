import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
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

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}