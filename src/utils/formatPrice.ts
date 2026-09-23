/**
 * Format a number as USD currency.
 * @example formatPrice(89.99) // "$89.99"
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}