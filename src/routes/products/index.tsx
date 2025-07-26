import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { columns } from '@/components/products/config'
import { DataTable } from '@/components/ui/data-table'
import { getProducts } from '@/lib/api/products'
import { useDataTableStore } from '@/store/data-table'
import { SearchInput } from '@/components/ui/search-input'
import { SelectFilter } from '@/components/ui/select-filter'
import { useProductCategories } from '@/lib/hooks/use-product-categories'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { parseProductData } from '@/components/products/utils'
import { getLocalStorageItem } from '@/lib/utils/local-storage'
import type { RawProductData } from '@/components/products/types'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  const {
    sorting,
    search,
    setSearch,
    pagination,
    setPagination,
    category,
    setCategory,
  } = useDataTableStore()

  const { data: categories = [] } = useProductCategories()
  
  const newAddedProducts = getLocalStorageItem<RawProductData[]>('newly-added-products')

  const { pageIndex, pageSize } = pagination

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', sorting, search, pageIndex, pageSize, category],
    queryFn: () =>
      getProducts({
        sortBy: sorting[0]?.id,
        order: sorting[0]?.desc ? 'desc' : 'asc',
        query: search,
        category,
        limit: pageSize,
        skip: pageIndex * pageSize,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  })

  const allProducts = React.useMemo(() => {
    const hasSearchParams = search || category !== 'all' || sorting.length > 0

    if (hasSearchParams || pageIndex > 0) {
      return data?.products ?? []
    }

    return [...parseProductData(newAddedProducts || []), ...(data?.products ?? [])]
  }, [data?.products, newAddedProducts, search, category, sorting, pageIndex])

  const pageCount = data ? Math.ceil(data.total / data.limit) : 0

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
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button asChild variant="outline">
            <Link to="/products/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-96">
            <SelectFilter
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="Select a category"
            />
          </div>
          <div className="max-w-md w-full">
            <SearchInput
              placeholder="Search by name..."
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={allProducts}
        pageCount={pageCount}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
    </div>
  )
} 