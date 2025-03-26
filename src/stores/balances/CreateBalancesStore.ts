import type { BalancesState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateBalancesStore = () =>
    createWithEqualityFn<BalancesState>(
        (set) => ({
            balances: {},
            isLoading: false,
            setBalance: (chain, balance) => set((state) => ({
                balances: {
                    ...state.balances,
                    [chain]: { chain, balance }
                }
            })),
            setBalances: (balances) => set({ balances }),
            setLoading: (isLoading) => set({ isLoading })
        }),
        Object.is,
    )