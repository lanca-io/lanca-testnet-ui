import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export type Chain = {
	id: string
	name: string
	logoURL: string
	explorerURL: string
	isCCIP: boolean
	nativeToken: string
	decimals: number
	selector: bigint
	hastCEROFaucet: boolean
}

export type ChainsState = {
	chains: Record<string, Chain>
}

export type ChainsStore = UseBoundStoreWithEqualityFn<StoreApi<ChainsState>>
