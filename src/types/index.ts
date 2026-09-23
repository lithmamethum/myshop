// Product — matches the shape in src/data/products.json
export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
  rating: number
  inStock: boolean
}

// Cart item — a Product with quantity
export interface CartItem extends Product {
  quantity: number
}

// User — the mock auth user
export interface User {
  email: string
  name: string
  loggedInAt: number
}

// Theme
export type Theme = 'light' | 'dark'

// Toast
export interface Toast {
  id: number
  message: string
}