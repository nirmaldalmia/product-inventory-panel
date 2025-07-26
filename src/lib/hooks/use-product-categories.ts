import { useQuery } from '@tanstack/react-query'
import { getProductCategories } from '@/lib/api/products'

export function useProductCategories() {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })
} 