import type { ChainsState, ChainsStore } from './types'
import { createWithEqualityFn } from 'zustand/traditional'
import { chains } from '@/configuration/chains'
import { shibuya, coreTestnet } from '@/configuration/chains'

const chainLogos: Record<number, string> = {
	81: '/Chains/81.svg',
	97: '/Chains/97.svg',
	133: '/Chains/133.svg',
	157: '/Chains/157.svg',
	195: '/Chains/195.svg',
	338: '/Chains/338.svg',
	919: '/Chains/919.svg',
	1114: '/Chains/1114.svg',
	1301: '/Chains/1301.svg',
	1328: '/Chains/1328.svg',
	1946: '/Chains/1946.svg',
	2021: '/Chains/2021.svg',
	3636: '/Chains/3636.svg',
	5003: '/Chains/5003.svg',
	10143: '/Chains/10143.svg',
	10200: '/Chains/10200.svg',
	33111: '/Chains/33111.svg',
	43113: '/Chains/43113.svg',
	44787: '/Chains/44787.svg',
	48899: '/Chains/48899.svg',
	57054: '/Chains/57054.svg',
	59141: '/Chains/59141.svg',
	80002: '/Chains/80002.svg',
	84532: '/Chains/84532.svg',
	200810: '/Chains/200810.svg',
	421614: '/Chains/421614.svg',
	763373: '/Chains/763373.svg',
	11155111: '/Chains/11155111.svg',
	11155420: '/Chains/11155420.svg',
	168587773: '/Chains/168587773.svg',
}

const initialState: ChainsState = {
	chains: {},
}

const allChains = [...chains, shibuya, coreTestnet]

allChains.forEach(chain => {
	const chainId = chain.id
	const explorerURL = chain.blockExplorers?.default?.url || ''

	initialState.chains[chainId] = {
		id: chainId.toString(),
		name: chain.name,
		logoURL: chainLogos[chain.id as number] || '',
		explorerURL: explorerURL,
	}
})

export const CreateChainsStore = (): ChainsStore => {
	return createWithEqualityFn<ChainsState>(
		() => ({
			...initialState,
		}),
		Object.is,
	)
}
