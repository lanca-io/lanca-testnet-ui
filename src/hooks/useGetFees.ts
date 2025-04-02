import type { Address } from 'viem'
import { useAccount } from 'wagmi'
import { zeroAddress } from 'viem'
import { useFormStore } from '@/stores/form/useFormStore'
import { getPublicClient } from '@/utils/client'
import { useQuery } from '@tanstack/react-query'
import { ConceroABI } from '@/assets/abi/ConceroABI'
import { ContractAddresses } from '@/configuration/addresses'

export const useGetFees = () => {
	const { address } = useAccount()
	const { sourceChain, destinationChain, fromAmount } = useFormStore()

	const fetchFee = async (): Promise<bigint> => {
		if (!sourceChain || !destinationChain || !fromAmount || fromAmount === '0') {
			return BigInt(0)
		}

		try {
			const sourceChainId = Number(sourceChain.id)
			const client = getPublicClient(sourceChainId)
			const contractAddress = ContractAddresses[sourceChain.id]

			if (!contractAddress) {
				return BigInt(0)
			}

			const dstChainSelector = destinationChain.selector

			const fee = await client.readContract({
				address: contractAddress as Address,
				abi: ConceroABI,
				functionName: 'getFee',
				args: [dstChainSelector, BigInt(fromAmount), zeroAddress, 1000000],
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
