import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { columns } from './config'
import { DataTable } from '@/components/ui/data-table'
import { getProducts } from '@/lib/api/products'
import { useSortingStore } from '@/store/data-table'
import { SearchInput } from '@/components/ui/search-input'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  const { sorting, search, setSearch } = useSortingStore()

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', sorting, search],
    queryFn: () =>
      getProducts({
        sortBy: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        query: search,
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="max-w-sm">
          <SearchInput
            placeholder="Search by name..."
            value={search}
            onChange={setSearch}
          />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data ?? []}
      />
    </div>
  )
} 