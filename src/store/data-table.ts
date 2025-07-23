import { create } from 'zustand'
import type { OnChangeFn, SortingState } from '@tanstack/react-table'

type SortingStore = {
  sorting: SortingState
  setSorting: OnChangeFn<SortingState>
}

export const useSortingStore = create<SortingStore>(set => ({
  sorting: [],
  setSorting: (updater) => {
    if (typeof updater === 'function') {
      set(state => ({ sorting: updater(state.sorting) }))
    }
    else {
      set({ sorting: updater })
    }
  },
})) 