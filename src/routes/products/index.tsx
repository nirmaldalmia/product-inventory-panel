import { createFileRoute } from '@tanstack/react-router'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './config'
import type { TProduct } from '@/components/products/types'

// Mock Data
const products: TProduct[] = [
  {
    id: '1',
    title: 'Laptop',
    category: 'Electronics',
    price: 1200,
    stock: 50,
    status: 'In Stock',
  },
  {
    id: '2',
    title: 'Keyboard',
    category: 'Accessories',
    price: 75,
    stock: 150,
    status: 'In Stock',
  },
  {
    id: '3',
    title: 'Mouse',
    category: 'Accessories',
    price: 25,
    stock: 0,
    status: 'Out of Stock',
  },
]

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <DataTable columns={columns} data={products} />
    </div>
  )
} 