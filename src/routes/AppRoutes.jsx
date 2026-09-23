import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'
import { ToastProvider } from '../context/ToastContext'
import { CartProvider } from '../context/CartContext'
import RequireAuth from '../components/common/RequireAuth'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home/Home'
import Products from '../pages/Products/Products'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import Login from '../pages/Login/Login'
import NotFound from '../pages/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'checkout',
        element: (
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function AppRoutes() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}