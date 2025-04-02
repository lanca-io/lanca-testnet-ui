import type { PublicClient } from 'viem'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormStore } from '@/stores/form/useFormStore'
import { getPublicClient } from '@/utils/client'
import { formatEther } from 'viem'

const ESTIMATED_GAS_COST: bigint = 510_000n

const fetchGasEstimate = async (sourceChainId: number): Promise<bigint> => {
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
    
    const handleFetchGasEstimate = useCallback(async (): Promise<bigint> => {
        if (!sourceChain) return BigInt(0)
        return fetchGasEstimate(Number(sourceChain.id))
    }, [sourceChain])

    const {
        data: gas,
        isLoading,
        error
    } = useQuery<bigint, Error>({
        queryKey: ['gasEstimate', sourceChain?.id],
        queryFn: handleFetchGasEstimate,
        enabled: !!sourceChain,
        refetchInterval: 60000,
        retry: 4,
    })

    const formattedGas: string = gas ? formatEther(gas) : '0'

    return { 
        gas, 
        formattedGas, 
        isLoading,
        isError: !!error
    }
}