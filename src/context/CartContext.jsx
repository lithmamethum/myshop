import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'myshop-cart'

// Reducer handles all cart actions in one place
function cartReducer(state, action) {
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

// Load initial cart from localStorage (so it persists on refresh)
function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadInitialCart)

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product) => dispatch({ type: 'ADD', product })
  const removeItem = (id) => dispatch({ type: 'REMOVE', id })
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QTY', id, quantity })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  // Derived values
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const value = {
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

// Custom hook for consuming the cart
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}