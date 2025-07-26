import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { useDataTableStore } from '@/store/data-table'
import { SearchInput } from '@/components/ui/search-input'
import { SelectFilter } from '@/components/ui/select-filter'
import { useProductCategories } from '@/lib/hooks/use-product-categories'
import { Button } from '@/components/ui/button'

export function ProductListHeader() {
  const { search, setSearch, category, setCategory } = useDataTableStore()
  const { data: categories = [] } = useProductCategories()

  return (
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
  )
} 