import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Products</h1>
      <p>This is where you'll see a list of all your products.</p>
    </div>
  )
} 