import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import products from '../../data/products'
import { formatPrice } from '../../utils/formatPrice'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { addItem } = useCart()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          Product not found
        </h1>
        <p className="text-slate-500 mb-6 dark:text-slate-400">
          The product you're looking for doesn't exist.
        </p>
        <Link
          to="/products"
          className="inline-block bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-slate-800 mb-6 dark:text-slate-400 dark:hover:text-slate-100 inline-flex items-center gap-1.5"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          <div className="aspect-square">
            <img
              src={product.image.replace('w=600', 'w=1200')}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-wide text-slate-400 mb-2 dark:text-slate-500">
            {product.category}
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 dark:text-white">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-yellow-500 flex items-center gap-1">
              <Star size={14} className="fill-yellow-500" />
              {product.rating}
            </span>
            <span className="text-sm text-slate-400">|</span>
            <span
              className={`text-sm font-medium ${
                product.inStock ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {product.inStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <p className="text-slate-600 mb-6 dark:text-slate-300">
            {product.description}
          </p>

          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 dark:text-white">
            {formatPrice(product.price)}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled={!product.inStock}
              onClick={() => {
                addItem(product)
                addToast(`Added "${product.name}" to cart`)
              }}
              className="flex-1 bg-slate-900 text-white font-semibold px-6 py-3 rounded-md hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="flex-1 text-center bg-slate-100 text-slate-900 font-semibold px-6 py-3 rounded-md hover:bg-slate-200 transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              View Cart
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500 space-y-3 dark:border-slate-700 dark:text-slate-400">
            <p className="flex items-center gap-2">
              <Truck size={16} /> Free shipping on orders over $50
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw size={16} /> 30-day return policy
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={16} /> Secure checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}