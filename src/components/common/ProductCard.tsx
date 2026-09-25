import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100 flex flex-col dark:bg-slate-800 dark:border-slate-700"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1 dark:text-slate-100">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-3 break-words dark:text-slate-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-yellow-500 flex items-center gap-1">
            <Star size={12} className="fill-yellow-500" />
            {product.rating}
          </span>
        </div>
      </div>
    </Link>
  )
}