import { useCallback } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useEstimateGas } from './useEstimateGas'

export const useInputError = () => {
	const { gas, isLoading: isGasLoading } = useEstimateGas()
	const { setError, sourceChain } = useFormStore()
	const { nativeBalances, balances, isLoading: isBalanceLoading } = useBalancesStore()

	const validateGasCost = useCallback(() => {
		if (isGasLoading || isBalanceLoading || !sourceChain || !sourceChain.id) {
			return false
		}

		const chainId = Number(sourceChain.id)
		const nativeBalance = nativeBalances?.[chainId]?.balance || '0'

		const gasCost = BigInt(gas!)
		const nativeBalanceBigInt = BigInt(nativeBalance)

		if (gasCost > nativeBalanceBigInt) {
			setError('Insufficient gas')
			return false
		}

		setError(null)
		return true
	}, [gas, isGasLoading, isBalanceLoading, nativeBalances, sourceChain, setError])

	const validateInputAmount = useCallback(
		(value: string) => {
			if (isBalanceLoading || !sourceChain || !sourceChain.id) {
				return false
			}

			const chainId = Number(sourceChain.id)
			const tokenBalance = balances?.[chainId]?.balance || '0'

			const inputAmountBigInt = BigInt(value)
			const tokenBalanceBigInt = BigInt(tokenBalance)

			if (inputAmountBigInt > tokenBalanceBigInt) {
				setError('Insufficient tCERO balance.')
				return false
			}

			setError(null)
			return true
		},
		[balances, isBalanceLoading, sourceChain, setError],
	)
	const handleInputError = useCallback(
		(value: string): boolean => {
			if (!validateGasCost()) {
				return false
			}

			if (!validateInputAmount(value)) {
				return false
			}

			setError(null)
			return true
		},
		[setError, validateGasCost, validateInputAmount],
	)

	return { handleInputError }
}
