import { z } from "zod"
import { humanize } from "@/lib/utils"

// Schema for the raw product data from the API
const rawProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  price: z.number(),
  stock: z.number(),
  availabilityStatus: z.string(),
});

// We transform the raw data into the shape our application uses.
// This is where we can rename fields and format data.
export const productSchema = rawProductSchema.transform((product) => ({
  id: String(product.id),
  name: product.title,
  category: humanize(product.category),
  price: product.price,
  stock: product.stock,
  status: product.availabilityStatus === "In Stock" ? "In Stock" : "Out of Stock",
}));

// Schema for the full API response, which includes an array of products
export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const newProductFormSchema = z.object({
  title: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be a positive number'),
  stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
  description: z.string().optional(),
});
