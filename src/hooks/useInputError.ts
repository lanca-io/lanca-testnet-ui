import { useCallback, useMemo, useEffect } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useEstimateGas } from './useEstimateGas'

export const useInputError = () => {
	const { gas, isLoading: isGasLoading } = useEstimateGas()
	const { fromAmount, setFromAmount, setError, sourceChain } = useFormStore()
	const { fromNativeBalance, fromBalance, fromBalanceLoading, fromNativeBalanceLoading } = useBalancesStore()

	const chainId = useMemo(() => (sourceChain?.id ? Number(sourceChain.id) : null), [sourceChain])

	const balanceData = useMemo(() => {
		if (!chainId) return { nativeBal: '0', tokenBal: '0' }
		return {
			nativeBal: fromNativeBalance || '0',
			tokenBal: fromBalance || '0',
		}
	}, [chainId, fromNativeBalance, fromBalance])

	const checkGas = useCallback((): boolean => {
		if (isGasLoading || fromNativeBalanceLoading || fromBalanceLoading || !chainId) return true

		try {
			const gasCost = BigInt(gas || '0')
			const nativeBal = BigInt(balanceData.nativeBal)

			if (gasCost > nativeBal) {
				setError('Insufficient gas')
				return false
			}

			return true
		} catch {
			return true
		}
	}, [
		gas,
		isGasLoading,
		fromNativeBalanceLoading,
		fromBalanceLoading,
		chainId,
		balanceData.nativeBal,
		setError,
		setFromAmount,
	])

	const checkAmount = useCallback(
		(val: string): boolean => {
			if (!val || val === '0') return true
			if (fromBalanceLoading || fromNativeBalanceLoading || !chainId) return true

			try {
				const inAmount = BigInt(val)
				const tokenBal = BigInt(balanceData.tokenBal)

				if (inAmount > tokenBal) {
					setError('Insufficient USDC balance')
					return false
				}

				if (inAmount < 2000n) {
					setError('Amount is too low')
					return false
				}

				console.log(inAmount)

				return true
			} catch {
				return true
			}
		},
		[fromBalanceLoading, fromNativeBalanceLoading, chainId, balanceData.tokenBal, setError, setFromAmount],
	)

	const validate = useCallback(
		(val: string): boolean => {
			setError(null)

			const hasGas = checkGas()
			const hasBal = checkAmount(val)

			return hasGas && hasBal
		},
		[checkGas, checkAmount, setError],
	)

	useEffect(() => {
		if (fromAmount && fromAmount !== '0') {
			validate(fromAmount)
		}
	}, [sourceChain, balanceData, gas, fromAmount, validate])

	return {
		validate,
		checkGas,
		checkAmount,
		isLoading: isGasLoading || fromNativeBalanceLoading || fromBalanceLoading,
	}
}
