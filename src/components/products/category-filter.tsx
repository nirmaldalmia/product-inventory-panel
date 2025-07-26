
import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getProductCategories } from '@/lib/api/products'
import { Button } from '@/components/ui/button'
import { humanize } from '@/lib/utils'

interface CategoryFilterProps {
  value: string
  onChange: (value: string) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  const showClearButton = value !== 'all'

  return (
    <div className="relative flex w-[240px] items-center">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {categories.map(category => (
            <SelectItem key={category} value={category}>
              {humanize(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showClearButton && (
        <Button
          variant="ghost"
          onClick={() => onChange('all')}
          className="absolute right-8 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
} 