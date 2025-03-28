import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export type Balance = {
	balance: string
	symbol: string
	decimals: number
}

export type NativeBalance = {
	balance: string
	symbol: string
	decimals: number
}

export type BalancesState = {
	balances: Record<number, Balance>
	nativeBalances: Record<number, NativeBalance>
	isLoading: boolean
	setBalance: (chain: number, balance: Balance) => void
	setNativeBalance: (chain: number, nativeBalance: NativeBalance) => void
	setBalances: (balances: Record<number, Balance>) => void
	setNativeBalances: (nativeBalances: Record<number, NativeBalance>) => void
	setLoading: (isLoading: boolean) => void
}

export type BalancesStore = UseBoundStoreWithEqualityFn<StoreApi<BalancesState>>
