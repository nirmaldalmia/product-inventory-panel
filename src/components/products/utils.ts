import { z } from "zod";
import type { Product, ProductFormData, RawProductData } from "./types";
import { productSchema } from "./schema";

// Transform form data to match GET API response format
export const transformProductData = (product: ProductFormData & { id: number }): RawProductData => ({
  id: Number(product.id),
  title: product.title,
  category: product.category,
  price: product.price,
  stock: product.stock,
  availabilityStatus: product.stock > 0 ? 'In Stock' : 'Out of Stock',
})

// Convert raw product data to the shape our application uses.
export const parseProductData = (products: RawProductData[]): Product[] =>
  z.array(productSchema).parse(products) ?? []