import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/components/products/types";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
] 