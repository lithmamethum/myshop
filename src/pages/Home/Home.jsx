import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Laptop,
  Dumbbell,
  Home as HomeIcon,
  Backpack,
  NotebookPen,
  Package,
} from 'lucide-react'
import products from '../../data/products.json'
import ProductCard from '../../components/common/ProductCard'

const categories = [...new Set(products.map((p) => p.category))]

// Map category name → Lucide icon component
const categoryIcons = {
  Electronics: Laptop,
  Sports: Dumbbell,
  Home: HomeIcon,
  Accessories: Backpack,
  Stationery: NotebookPen,
}

export default function Home() {
  const featured = products.slice(0, 4)
  const bestSellers = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg p-8 md:p-12 dark:from-slate-950 dark:to-slate-800">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Welcome to My Shop
        </h1>
        <p className="text-slate-300 mb-6 max-w-xl">
          Discover curated products at great prices. Fast shipping, easy returns.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-md hover:bg-slate-100 transition-colors"
        >
          Shop Now <ArrowRight size={18} />
        </Link>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 dark:text-slate-100">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Package
            return (
              <Link
                key={cat}
                to="/products"
                className="bg-white border border-slate-100 rounded-lg p-4 text-center hover:border-slate-300 hover:shadow-sm transition-all dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-500 flex flex-col items-center"
              >
                <Icon
                  size={28}
                  className="text-slate-700 dark:text-slate-200 mb-2"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {cat}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400 inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Best Sellers
          </h2>
          <Link
            to="/products"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400 inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}