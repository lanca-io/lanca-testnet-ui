import type { PublicClient } from 'viem'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { convertToViemChain, createTransports } from '@/utils/chains'
import { createPublicClient, http } from 'viem'

export const usePublicClient = () => {
	const { chains } = useChainsStore()

	const create = (chainId: number): PublicClient => {
		const chain = chains[chainId]
		if (!chain) throw new Error(`Chain with id ${chainId} not found`)

		const viemChain = convertToViemChain(chain)
		const transports = createTransports([chain])
		const transport = transports[chainId] ?? transports[chain.id] ?? http()

		return createPublicClient({
			chain: viemChain,
			transport,
		})
	}

	return { create }
}
