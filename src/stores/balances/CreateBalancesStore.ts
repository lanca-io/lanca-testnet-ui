import type { BalancesState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateBalancesStore = () =>
	createWithEqualityFn<BalancesState>(
		set => ({
			balances: {},
			nativeBalances: {},
			isLoading: false,
			setBalance: (chain, balance) =>
				set(state => ({
					balances: {
						...state.balances,
						[chain]: balance,
					},
				})),
			setNativeBalance: (chain, nativeBalance) =>
				set(state => ({
					nativeBalances: {
						...state.nativeBalances,
						[chain]: nativeBalance,
					},
				})),
			setBalances: balances => set({ balances }),
			setNativeBalances: nativeBalances => set({ nativeBalances }),
			setLoading: isLoading => set({ isLoading }),
		}),
		Object.is,
	)
