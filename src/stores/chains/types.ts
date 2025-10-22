import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export type ConceroChain = {
	id: number
	name: string
	selector: bigint
	logo: string
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	rpcUrls: {
		default: {
			http: string[]
		}
	}
	explorer: string | null
	testnet: boolean
	contracts: {
		usdc_e: string
		bridge_lbf: string
	}
}

export type ChainId = number

export type ChainsState = {
	chains: Record<ChainId, ConceroChain>
	loading: boolean
}

export type ChainsActions = {
	setChains: (chains: ConceroChain[]) => void
	setLoading: (loading: boolean) => void
}

export type ChainsStore = UseBoundStoreWithEqualityFn<StoreApi<ChainsState & ChainsActions>>
