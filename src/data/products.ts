import productsData from './products.json'
import type { Product } from '../types'

/**
 * Typed product list.
 * In a real app, replace this with an API call:
 *   const products = await fetchProducts()
 */
export const products: Product[] = productsData as Product[]

export default products