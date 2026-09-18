import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/formatPrice'

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()

  // Empty state
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-3 dark:text-white">Your Cart is Empty</h1>
        <p className="text-slate-500 mb-6 dark:text-slate-400">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/products"
          className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-100 p-4 flex gap-4 dark:bg-slate-800 dark:border-slate-700"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md"
              />

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-3">
                  <div>
                    <Link
                      to={`/products/${item.id}`}
                      className="font-semibold text-slate-800 hover:underline dark:text-slate-100"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mt-1">
                      {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-500 text-sm"
                    aria-label="Remove"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-slate-200 rounded-md dark:border-slate-600">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-l-md dark:text-slate-300 dark:hover:bg-slate-700"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-r-md dark:text-slate-300 dark:hover:bg-slate-700"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-100 p-6 sticky top-24 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="text-lg font-bold mb-4 dark:text-white">Order Summary</h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 mb-6 flex justify-between text-base font-bold dark:border-slate-700 dark:text-white">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-700 transition-colors"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="block w-full text-center text-sm text-slate-500 hover:text-slate-800 mt-3"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}