import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'

export const useHasTestTokens = () => {
	const { isConnected } = useAccount()
	const { balances, isLoading: isBalanceLoading } = useBalancesStore()
	const [hasTokens, setHasTokens] = useState<boolean | null>(null)
	const [isCheckingTokens, setIsCheckingTokens] = useState<boolean>(true)

	const checkForTokens = useCallback(() => {
		if (!isConnected) {
			setHasTokens(false)
			setIsCheckingTokens(false)
			return
		}

		setIsCheckingTokens(true)

		if (isBalanceLoading) {
			return
		}

		if (Object.keys(balances).length === 0) {
			setHasTokens(false)
			setIsCheckingTokens(false)
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
		setIsCheckingTokens(false)
	}, [isConnected, balances, isBalanceLoading])

	useEffect(() => {
		checkForTokens()
	}, [checkForTokens])

	// Define isLoading with explicit handling for disconnected state
	const isLoading = isConnected ? isBalanceLoading || isCheckingTokens || hasTokens === null : false

	return {
		hasTokens: isConnected ? hasTokens : false,
		isLoading,
	}
}
