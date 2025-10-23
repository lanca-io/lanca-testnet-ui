import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormStore } from '@/stores/form/useFormStore'
import { usePublicClient } from './usePublicClient'
import { formatEther } from 'viem'
import { useGetFees } from './useGetFees'

const ESTIMATED_GAS_COST: bigint = 510_000n

export const useEstimateGas = () => {
    const { sourceChain } = useFormStore()
    const { fee, isLoading: isFeeLoading } = useGetFees()
    const { create } = usePublicClient()
    const chainId = sourceChain?.id ? Number(sourceChain.id) : undefined

    const {
        data: gasEstimate = BigInt(0),
        isLoading: isGasLoading,
        error,
    } = useQuery<bigint, Error>({
        queryKey: ['gasEstimate', chainId],
        queryFn: async () => {
            if (!chainId) return BigInt(0)

            try {
                const client = create(chainId)
                const price = await client.getGasPrice()
                return (price * ESTIMATED_GAS_COST * BigInt(12)) / BigInt(10)
            } catch {
                return BigInt(0)
            }
        },
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
