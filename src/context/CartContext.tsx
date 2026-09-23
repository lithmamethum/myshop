import { createContext, useContext, useEffect, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '../types'
import { STORAGE_KEYS } from '../utils/constants'

// -------- Reducer types --------

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'UPDATE_QTY'; id: number; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((item) => item.id === action.product.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.product, quantity: 1 }]
    }

    case 'REMOVE':
      return state.filter((item) => item.id !== action.id)

    case 'UPDATE_QTY': {
      if (action.quantity < 1) return state
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      )
    }

    case 'CLEAR':
      return []

    default:
      return state
  }
}

// -------- Context --------

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, dispatch] = useReducer(cartReducer, [], loadInitialCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items))
  }, [items])

  const addItem = (product: Product) => dispatch({ type: 'ADD', product })
  const removeItem = (id: number) => dispatch({ type: 'REMOVE', id })
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', id, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
