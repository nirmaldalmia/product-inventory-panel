import { productsResponseSchema } from "@/components/products/schema";

export async function getProducts() {
  const res = await fetch('https://dummyjson.com/products?select=title,category,price,stock,availabilityStatus')

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await res.json()
  return productsResponseSchema.parse(data).products
} 