import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'

export const useHasTestTokens = () => {
	const { isConnected } = useAccount()
	const { balances, isLoading: isBalanceLoading } = useBalancesStore()
	const [hasTokens, setHasTokens] = useState(false)

	const checkForTokens = useCallback(() => {
		if (!isConnected || isBalanceLoading) {
			return
		}

		if (Object.keys(balances).length === 0) {
			setHasTokens(false)
			return
		}

		let foundTokens = false
		for (const token of Object.values(balances)) {
			if (!token.balance) continue

			try {
				if (BigInt(token.balance) > BigInt(0)) {
					foundTokens = true
					break
				}
			} catch {
				continue
			}
		}

		setHasTokens(foundTokens)
	}, [isConnected, balances, isBalanceLoading])

	useEffect(() => {
		checkForTokens()
	}, [checkForTokens])

	return {
		hasTokens,
		isLoading: isBalanceLoading,
	}
}
