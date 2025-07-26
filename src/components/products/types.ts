import { z } from "zod";
import { newProductFormSchema, productSchema, rawProductSchema } from "./schema";

export type Product = z.infer<typeof productSchema>

export type ProductFormData = z.infer<typeof newProductFormSchema>

export type RawProductData = z.infer<typeof rawProductSchema>