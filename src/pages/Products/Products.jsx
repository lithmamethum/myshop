import { useMemo, useState } from 'react'
import products from '../../data/products.json'
import ProductCard from '../../components/common/ProductCard'
import { Search, X } from 'lucide-react'

const categories = ['All', ...new Set(products.map((p) => p.category))]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')

  const visibleProducts = useMemo(() => {
    let result = [...products]
    if (category !== 'All') result = result.filter((p) => p.category === category)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
    }
    return result
  }, [search, category, sort])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 dark:text-slate-100">
          All Products
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Showing {visibleProducts.length} of {products.length} products
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-100 p-4 mb-6 space-y-4 dark:bg-slate-800 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:ring-slate-400"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-white dark:focus:ring-slate-400"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
          <Search
            size={48}
            className="mx-auto text-slate-300 dark:text-slate-600 mb-4"
          />
          <h2 className="text-xl font-bold mb-2 dark:text-slate-100">
            No products found
          </h2>
          <p className="text-slate-500 mb-6 dark:text-slate-400">
            Try a different search or category.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setCategory('All')
              setSort('featured')
            }}
            className="bg-slate-900 text-white px-5 py-2 rounded-md hover:bg-slate-700 text-sm dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  )
}