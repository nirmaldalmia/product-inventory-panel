import type { ColumnDef } from "@tanstack/react-table";
import type { TProduct } from "./types";

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]