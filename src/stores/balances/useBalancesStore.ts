import { useContext } from 'react'
import { BalancesContext } from './BalancesContext'

export const useBalancesStore = () => {
    const useStore = useContext(BalancesContext)
    if (!useStore) {
        throw new Error(`You forgot to wrap your component in <BalancesStoreProvider>.`)
    }

    const balances = useStore(state => state.balances)
    const isLoading = useStore(state => state.isLoading)
    const setBalance = useStore(state => state.setBalance)
    const setBalances = useStore(state => state.setBalances)
    const setLoading = useStore(state => state.setLoading)

    return {
        balances,
        isLoading,
        setBalance,
        setBalances,
        setLoading,
    }
}