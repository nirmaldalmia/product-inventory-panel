import { create } from 'zustand'
import type { OnChangeFn, SortingState } from '@tanstack/react-table'

type SortingStore = {
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
  search: string
  setSearch: (search: string) => void
}

export const useSortingStore = create<SortingStore>(set => ({
  sorting: [],
  search: '',
  setSearch: search => set({ search }),
  // onSortingChange handler can be a function or a value
  setSorting: updater =>
    set(state => ({
      sorting: typeof updater === 'function' ? updater(state.sorting) : updater,
    })),
})) 