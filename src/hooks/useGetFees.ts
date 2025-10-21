import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useFormStore } from '@/stores/form/useFormStore'
import { getPublicClient } from '@/utils/client'
import { useQuery } from '@tanstack/react-query'
import { LBFABI } from '@/assets/abi/LBFABI'
import { useChainsStore } from '@/stores/chains/useChainsStore'

export const useGetFees = () => {
	const { address } = useAccount()
	const { chains } = useChainsStore()
	const { sourceChain, destinationChain, fromAmount } = useFormStore()

	const fetchFee = async (): Promise<bigint> => {
		if (!sourceChain || !destinationChain || !fromAmount || fromAmount === '0') {
			return BigInt(0)
		}

		try {
			const sourceChainId = Number(sourceChain.id)
			const client = getPublicClient(sourceChainId)
			const contractAddress = chains[sourceChainId]?.contracts.bridge_lbf

			if (!contractAddress) {
				return BigInt(0)
			}

			const dstChainSelector = destinationChain.selector

			const fee = await client.readContract({
				address: contractAddress as Address,
				abi: LBFABI,
				functionName: 'getBridgeNativeFee',
				args: [dstChainSelector, 0n],
			})

			return fee as bigint
		} catch (error) {
			console.error('Error fetching fee:', error)
			return BigInt(0)
		}
	}

	const {
		data: fee,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['getFee', sourceChain?.id, destinationChain?.id, fromAmount],
		queryFn: fetchFee,
		enabled:
			Boolean(sourceChain) &&
			Boolean(destinationChain) &&
			Boolean(fromAmount) &&
			fromAmount !== '0' &&
			Boolean(address),
		retry: 3,
	})

	return { fee, isLoading, error }
}
