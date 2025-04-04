import type { PublicClient } from 'viem'
import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormStore } from '@/stores/form/useFormStore'
import { getPublicClient } from '@/utils/client'
import { formatEther } from 'viem'
import { useGetFees } from './useGetFees'

const ESTIMATED_GAS_COST: bigint = 510_000n

const fetchGasEstimate = async (sourceChainId: number | undefined): Promise<bigint> => {
    if (!sourceChainId) return BigInt(0)
    
    try {
        const client: PublicClient = getPublicClient(sourceChainId)
        const price = await client.getGasPrice()
        return price * ESTIMATED_GAS_COST
    } catch {
        return BigInt(0)
    }
}

export const useEstimateGas = () => {
    const { sourceChain } = useFormStore()
    const { fee, isLoading: isFeeLoading } = useGetFees()
    const chainId = sourceChain?.id ? Number(sourceChain.id) : undefined

    const {
        data: gasEstimate = BigInt(0),
        isLoading: isGasLoading,
        error,
    } = useQuery<bigint, Error>({
        queryKey: ['gasEstimate', chainId],
        queryFn: () => fetchGasEstimate(chainId),
        enabled: !!chainId,
        refetchInterval: 60000,
        retry: 4,
        staleTime: 60000,
    })

    const gas = useMemo(() => {
        if (!fee) return gasEstimate
        return gasEstimate + fee
    }, [gasEstimate, fee])

    const formattedGas = useMemo(() => formatEther(gas), [gas])

    return {
        gas,
        formattedGas,
        gasEstimate,
        isLoading: isGasLoading || isFeeLoading,
        isError: !!error,
    }
}