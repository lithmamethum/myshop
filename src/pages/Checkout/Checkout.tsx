import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { FormEvent } from 'react'
import { CheckCircle2, Lock } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatPrice'

interface InputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}

function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: InputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 mb-1 block dark:text-slate-300">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:ring-slate-400"
      />
    </label>
  )
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  if (items.length === 0 && !placed) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-3 dark:text-white">
          Nothing to check out
        </h1>
        <p className="text-slate-500 mb-6 dark:text-slate-400">
          Add some products first.
        </p>
        <Link
          to="/products"
          className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  if (placed) {
    return (
      <div className="text-center py-20 max-w-md mx-auto">
        <CheckCircle2
          size={64}
          className="mx-auto text-green-500 mb-4"
          strokeWidth={1.5}
        />
        <h1 className="text-3xl font-bold mb-3 dark:text-white">
          Order Placed!
        </h1>
        <p className="text-slate-500 mb-2 dark:text-slate-400">
          Thanks for your purchase. A confirmation email is on its way (not
          really — this is a demo).
        </p>
        <p className="text-sm text-slate-400 mb-6 dark:text-slate-500">
          Order ID: <span className="font-mono">{orderId}</span>
        </p>
        <Link
          to="/products"
          className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    setOrderId(id)
    setPlaced(true)
    clearCart()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 dark:text-slate-100">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Left: form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <section className="bg-white rounded-lg border border-slate-100 p-6 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="font-bold mb-4 dark:text-white">
              Shipping Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="First Name" name="firstName" required />
              <Input label="Last Name" name="lastName" required />
              <div className="md:col-span-2">
                <Input label="Email" name="email" type="email" required />
              </div>
              <div className="md:col-span-2">
                <Input label="Address" name="address" required />
              </div>
              <Input label="City" name="city" required />
              <Input label="ZIP / Postal Code" name="zip" required />
            </div>
          </section>

          {/* Payment (fake) */}
          <section className="bg-white rounded-lg border border-slate-100 p-6 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="font-bold mb-4 dark:text-white">Payment</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Card Number"
                  name="card"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <Input label="Expiry" name="expiry" placeholder="MM/YY" required />
              <Input label="CVC" name="cvc" placeholder="123" required />
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5 dark:text-slate-500">
              <Lock size={12} /> This is a demo. Do not enter real card details.
            </p>
          </section>
        </div>

        {/* Right: order summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-100 p-6 lg:sticky lg:top-24 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="font-bold mb-4 dark:text-white">Order Summary</h2>

            <ul className="space-y-3 mb-4 max-h-64 overflow-auto">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1 dark:text-slate-100">
                      {item.name}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium dark:text-slate-200">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-200 pt-4 space-y-2 text-sm dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Subtotal
                </span>
                <span className="dark:text-slate-200">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">
                  Shipping
                </span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between font-bold mb-6 dark:border-slate-700 dark:text-white">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-700 transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Place Order
            </button>
          </div>
        </aside>
      </form>
    </div>
  )
}