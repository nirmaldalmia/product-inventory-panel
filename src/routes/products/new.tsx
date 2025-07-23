import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/new')({
  component: NewProductPage,
})

function NewProductPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <p>This is where the form to add a new product will be.</p>
    </div>
  )
} 