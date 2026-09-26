import { Link } from 'react-router-dom'
import { PackageX, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <PackageX
        size={64}
        className="mx-auto text-slate-300 dark:text-slate-600 mb-4"
        strokeWidth={1.5}
      />
      <h1 className="text-6xl font-bold mb-4 dark:text-white">404</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Page not found.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  )
}