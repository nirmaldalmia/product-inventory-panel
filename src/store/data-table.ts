import { create } from 'zustand'
import type { OnChangeFn, SortingState, PaginationState } from '@tanstack/react-table'

type DataTableStore = {
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
  search: string
  setSearch: (search: string) => void
  category: string
  setCategory: (category: string) => void
  pagination: PaginationState
  setPagination: OnChangeFn<PaginationState>
}

export const useDataTableStore = create<DataTableStore>(set => ({
  sorting: [],
  search: '',
  category: 'all',
  pagination: {
    pageIndex: 0,
    pageSize: 20,
  },
  setSearch: search =>
    set(state => ({
      search,
      pagination: { ...state.pagination, pageIndex: 0 },
    })),
  setCategory: category =>
    set(state => ({
      category,
      pagination: { ...state.pagination, pageIndex: 0 },
    })),
  setPagination: updater =>
    set(state => ({
      pagination:
        typeof updater === 'function'
          ? updater(state.pagination)
          : updater,
    })),
  // onSortingChange handler can be a function or a value
  setSorting: updater =>
    set(state => ({
      sorting: typeof updater === 'function' ? updater(state.sorting) : updater,
    })),
})) 