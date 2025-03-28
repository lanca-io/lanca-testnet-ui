import { useContext } from 'react'
import { BalancesContext } from './BalancesContext'

export const useBalancesStore = () => {
	const useStore = useContext(BalancesContext)
	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <BalancesStoreProvider>.`)
	}

	const balances = useStore(state => state.balances)
	const nativeBalances = useStore(state => state.nativeBalances)
	const isLoading = useStore(state => state.isLoading)
	const setBalance = useStore(state => state.setBalance)
	const setNativeBalance = useStore(state => state.setNativeBalance)
	const setBalances = useStore(state => state.setBalances)
	const setNativeBalances = useStore(state => state.setNativeBalances)
	const setLoading = useStore(state => state.setLoading)

	return {
		balances,
		nativeBalances,
		isLoading,
		setBalance,
		setNativeBalance,
		setBalances,
		setNativeBalances,
		setLoading,
	}
}
