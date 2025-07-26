import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addProduct } from '@/lib/api/products'
import { newProductFormSchema } from '@/components/products/schema'
import type { ProductFormData } from '@/components/products/types'
import { Button } from '@/components/ui/button'
import { useProductCategories } from '@/lib/hooks/use-product-categories'
import { appendToLocalStorageArray } from '@/lib/utils/local-storage'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { humanize } from '@/lib/utils'
import { transformProductData } from '@/components/products/utils'

export const Route = createFileRoute('/products/new')({
  component: NewProductPage,
})

function NewProductPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = useForm<ProductFormData>({
    resolver: zodResolver(newProductFormSchema),
    defaultValues: {
      title: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
    },
  })

  const { data: categories, isLoading: isLoadingCategories } =
    useProductCategories()

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Product added successfully!')
      appendToLocalStorageArray('newly-added-products', transformProductData(newProduct))
      navigate({ to: '/products' })
    },
    onError: (error) => {
      toast.error('Failed to add product', {
        description: error.message,
      })
    }
  })

  const onSubmit = (data: ProductFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="p-4 mx-auto max-w-lg pt-40">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. iPhone 15 Pro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoadingCategories}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isLoadingCategories
                            ? 'Loading...'
                            : 'Select a category'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(category => (
                      <SelectItem key={category} value={category}>
                        {humanize(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={event => field.onChange(event.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={event => field.onChange(event.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief description of the product."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/products' })}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 