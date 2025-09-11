import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export type Chain = {
	id: string
	name: string
	logoURL: string
	disabledLogoURL: string
	explorerURL: string
	nativeToken: string
	decimals: number
	selector: bigint
	hasUSDCFaucet: boolean
}

export type ChainsState = {
	chains: Record<string, Chain>
}

export type ChainsStore = UseBoundStoreWithEqualityFn<StoreApi<ChainsState>>
