import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { columns } from '@/components/products/config'
import { DataTable } from '@/components/ui/data-table'
import { getProducts } from '@/lib/api/products'
import { useDataTableStore } from '@/store/data-table'
import { parseProductData } from '@/components/products/utils'
import { getLocalStorageItem } from '@/lib/utils/local-storage'
import type { RawProductData } from '@/components/products/types'
import { ProductListHeader } from '@/components/products/product-list-header'
import { QueryBoundary } from '@/components/ui/query-boundary'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  const {
    sorting,
    search,
    pagination,
    setPagination,
    category,
    setSorting,
  } = useDataTableStore()

  const newAddedProducts =
    getLocalStorageItem<RawProductData[]>('newly-added-products')

  const { pageIndex, pageSize } = pagination

  const { data, ...queryState } = useQuery({
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

    return [
      ...parseProductData(newAddedProducts || []),
      ...(data?.products ?? []),
    ]
  }, [data?.products, newAddedProducts, search, category, sorting, pageIndex])

  const pageCount = data ? Math.ceil(data.total / data.limit) : 0

  return (
    <div className="container mx-auto py-10">
      <ProductListHeader />
      <QueryBoundary {...queryState}>
        <DataTable
          columns={columns}
          data={allProducts}
          pageCount={pageCount}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </QueryBoundary>
    </div>
  )
} 