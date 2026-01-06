import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { Address } from 'viem'

const fetchClaimedChainsData = async (address: Address): Promise<number[]> => {
	if (!address) return []

	try {
		const response = await fetch(`https://api.v2.concero.io/api/v1/faucet/available-requests?address=${address}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`)
		}

		const data = await response.json()
		return Array.isArray(data?.payload?.available) ? data.payload.available : []
	} catch (error) {
		console.error('Failed to fetch claimed chains:', error)
		return []
	}
}

export const useUnclaimedFaucets = () => {
	const { address } = useAccount()

	const {
		data: unclaimedChains = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['claimedFaucets', address],
		queryFn: () => fetchClaimedChainsData(address as Address),
		enabled: !!address,
	})

	return {
		unclaimedChains,
		isLoading,
		refetch,
	}
}
