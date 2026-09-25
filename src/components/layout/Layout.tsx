import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}