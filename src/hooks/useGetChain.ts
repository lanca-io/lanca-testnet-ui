import { useChainsStore } from '@/stores/chains/useChainsStore'

export const useGetChain = (chainId: number) => {
	const { chains } = useChainsStore()

	const chain = chains[chainId]

	return chain
}
