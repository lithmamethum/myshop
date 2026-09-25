import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { FormEvent } from 'react'
import { ShoppingCart } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto dark:bg-slate-950 dark:border-t dark:border-slate-800">
      {/* Newsletter */}
      <div className="border-b border-slate-700 dark:border-slate-800">
        <div className="w-full max-w-7xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">
              Get 10% off your first order
            </h3>
            <p className="text-sm text-slate-400">
              Subscribe to our newsletter. No spam, ever.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row w-full md:w-auto gap-2 max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 px-3 py-2 rounded-md bg-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white text-sm dark:bg-slate-800"
            />
            <button
              type="submit"
              className="bg-white text-slate-900 font-semibold px-4 py-2 rounded-md hover:bg-slate-200 text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {done && (
          <p className="w-full max-w-7xl mx-auto pb-4 text-green-400 text-sm">
            ✓ Thanks! Check your inbox.
          </p>
        )}
      </div>

      {/* Links */}
      <div className="w-full max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-white font-bold mb-2 flex items-center gap-2">
            <ShoppingCart size={18} /> My Shop
          </h3>
          <p className="text-sm text-slate-400">
            Your one-stop shop for everything.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white">Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-sm text-slate-400">support@myshop.com</p>
        </div>
      </div>

      <div className="border-t border-slate-700 dark:border-slate-800 text-center p-4 text-xs text-slate-500">
        © 2026 My Shop. All rights reserved.
      </div>
    </footer>
  )
}