import { z } from "zod"
import { productSchema } from "./schema"

export type TProduct = z.infer<typeof productSchema>