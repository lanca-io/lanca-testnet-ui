import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export type Balance = {
    balance: string
}

export type BalancesState = {
    balances: Record<number, Balance>
    isLoading: boolean
    setBalance: (chain: number, balance: string) => void
    setBalances: (balances: Record<string, Balance>) => void
    setLoading: (isLoading: boolean) => void
}

export type BalancesStore = UseBoundStoreWithEqualityFn<StoreApi<BalancesState>>