import { z } from "zod";
import { newProductFormSchema, productSchema } from "./schema";

export type Product = z.infer<typeof productSchema>

export type ProductFormData = z.infer<typeof newProductFormSchema>