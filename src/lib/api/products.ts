import { productsResponseSchema } from "@/components/products/schema";

// fetch only relevant fields
const select = ['title', 'category', 'price', 'stock', 'availabilityStatus']

export async function getProducts({
  sortBy,
  order,
  query,
}: {
  sortBy?: string
  order?: 'asc' | 'desc'
  query?: string
}) {
  const url = new URL('https://dummyjson.com/products')

  if (query) {
    url.pathname = `/products/search`
    url.searchParams.set('q', query)
  }

  url.searchParams.set('select', select.join(','))
  if (sortBy) {
    url.searchParams.set('sortBy', sortBy)
    if (order) {
      url.searchParams.set('order', order)
    }
  }

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await res.json()
  return productsResponseSchema.parse(data).products
} 