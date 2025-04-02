import { useCallback, useMemo, useEffect } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useEstimateGas } from './useEstimateGas'

export const useInputError = () => {
    const { gas, isLoading: isGasLoading } = useEstimateGas()
    const { fromAmount, setFromAmount, setError, sourceChain } = useFormStore()
    const { nativeBalances, balances, isLoading: isBalanceLoading } = useBalancesStore()

    const chainId = useMemo(() => 
        sourceChain?.id ? Number(sourceChain.id) : null
    , [sourceChain])

    const balanceData = useMemo(() => {
        if (!chainId) return { nativeBal: '0', tokenBal: '0' }
        return {
            nativeBal: nativeBalances?.[chainId]?.balance || '0',
            tokenBal: balances?.[chainId]?.balance || '0'
        }
    }, [chainId, nativeBalances, balances])

    const checkGas = useCallback((): boolean => {
        if (isGasLoading || isBalanceLoading || !chainId) return true
        
        try {
            const gasCost = BigInt(gas || '0')
            const nativeBal = BigInt(balanceData.nativeBal)

            if (gasCost > nativeBal) {
                setFromAmount('')
                setError('Insufficient gas')
                return false
            }

            return true
        } catch {
            return true 
        }
    }, [gas, isGasLoading, isBalanceLoading, chainId, balanceData.nativeBal, setError, setFromAmount])

    const checkAmount = useCallback((val: string): boolean => {
        if (!val || val === '0') return true
        if (isBalanceLoading || !chainId) return true
        
        try {
            const inAmount = BigInt(val)
            const tokenBal = BigInt(balanceData.tokenBal)

            if (inAmount > tokenBal) {
                setFromAmount('')
                setError('Insufficient tCERO balance')
                return false
            }

            return true
        } catch {
            return true 
        }
    }, [isBalanceLoading, chainId, balanceData.tokenBal, setError, setFromAmount])

    const validate = useCallback((val: string): boolean => {
        setError(null)
        
        const hasGas = checkGas()
        const hasBal = checkAmount(val)
        
        return hasGas && hasBal
    }, [checkGas, checkAmount, setError])
    
    useEffect(() => {
        if (fromAmount && fromAmount !== '0') {
            validate(fromAmount)
        }
    }, [sourceChain, balanceData, gas, fromAmount, validate])

    return {
        validate,
        checkGas,
        checkAmount,
        isLoading: isGasLoading || isBalanceLoading
    }
}