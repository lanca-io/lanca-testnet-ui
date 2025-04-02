import type { PublicClient } from 'viem'
import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormStore } from '@/stores/form/useFormStore'
import { getPublicClient } from '@/utils/client'
import { formatEther } from 'viem'
import { useGetFees } from './useGetFees'

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
	const { fee, isLoading: isFeeLoading } = useGetFees()

	const handleFetchGasEstimate = useCallback(async (): Promise<bigint> => {
		if (!sourceChain) return BigInt(0)
		return fetchGasEstimate(Number(sourceChain.id))
	}, [sourceChain])

	const {
		data: gasEstimate,
		isLoading: isGasLoading,
		error,
	} = useQuery<bigint, Error>({
		queryKey: ['gasEstimate', sourceChain?.id],
		queryFn: handleFetchGasEstimate,
		enabled: !!sourceChain,
		refetchInterval: 60000,
		retry: 4,
	})
	const gas = useMemo(() => {
		if (!gasEstimate) return BigInt(0)
		if (!fee) return gasEstimate

		return gasEstimate + fee
	}, [gasEstimate, fee])

	const formattedGas = useMemo(() => {
		if (!gas) return '0'
		return formatEther(gas)
	}, [gas])

	return {
		gas,
		formattedGas,
		gasEstimate,
		isLoading: isGasLoading || isFeeLoading,
		isError: !!error,
	}
}
