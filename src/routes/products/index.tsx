import { createFileRoute } from '@tanstack/react-router'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import * as React from 'react'

import { columns } from './config'
import { DataTable } from '@/components/ui/data-table'
import { getProducts } from '@/lib/api/products'
import { useSortingStore } from '@/store/data-table'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  const { sorting } = useSortingStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', sorting],
    queryFn: () =>
      getProducts({
        sortBy: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <DataTable
        columns={columns}
        data={data ?? []}
      />
    </div>
  )
} 