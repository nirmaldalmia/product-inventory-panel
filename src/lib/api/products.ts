import { productsResponseSchema } from '@/components/products/schema'
import type { ProductFormData } from '@/components/products/types'

// fetch only relevant fields
const select = ['title', 'category', 'price', 'stock', 'availabilityStatus']

const BASE_URL = 'https://dummyjson.com'

export async function getProducts({
  sortBy,
  order,
  query,
  category,
  limit = 20,
  skip = 0,
}: {
  sortBy?: string
  order?: 'asc' | 'desc'
  query?: string
  category?: string
  limit?: number
  skip?: number
}) {
  const url = new URL(`${BASE_URL}/products`)

  if (query) {
    url.pathname = `/products/search`
    url.searchParams.set('q', query)
  } else if (category && category !== 'all') {
    url.pathname = `/products/category/${category}`
  }

  url.searchParams.set('select', select.join(','))
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('skip', String(skip))

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
  return productsResponseSchema.parse(data)
}

export async function addProduct(data: ProductFormData) {
  const { title, price, stock, description, category } = data

  const res = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      price,
      stock,
      description,
      category,
    }),
  })
  if (!res.ok) {
    throw new Error('Failed to add product')
  }
  return res.json()
}

export async function getProductCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`)
  if (!res.ok) {
    throw new Error('Failed to fetch categories')
  }
  return res.json()
} 