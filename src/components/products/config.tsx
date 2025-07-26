import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/components/products/types";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    size: 40,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 20,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    size: 10,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
    size: 10,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 20,
  },
] 