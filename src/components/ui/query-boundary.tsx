import * as React from 'react'
import type { UseQueryResult } from '@tanstack/react-query'

interface QueryBoundaryProps<TData, TError>
  extends Pick<UseQueryResult<TData, TError>, 'isLoading' | 'error'> {
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: (error: TError) => React.ReactNode
}

export function QueryBoundary<TData, TError extends Error>({
  children,
  isLoading,
  error,
  loadingComponent,
  errorComponent,
}: QueryBoundaryProps<TData, TError>) {
  if (isLoading) {
    return (
      loadingComponent ?? (
        <div className="flex items-center justify-center h-96">
          <p>Loading...</p>
        </div>
      )
    )
  }

  if (error) {
    return (
      errorComponent?.(error) ?? (
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      )
    )
  }

  return <>{children}</>
} 