import { z } from 'zod'

export const statusSchema = z.enum(["In Stock", "Low Stock", "Out of Stock"])

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
  status: statusSchema,
})
