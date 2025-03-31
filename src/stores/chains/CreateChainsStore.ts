import type { ChainsState, ChainsStore } from './types'
import { createWithEqualityFn } from 'zustand/traditional'
import { chainLogos, chainCCIP, chainSelectors } from './ChainInfo'
import { chains } from '@/configuration/chains'

const initialState: ChainsState = {
	chains: {},
}

chains.forEach(chain => {
	const chainId = chain.id
	const explorerURL = chain.blockExplorers?.default?.url || ''
	const nativeToken = chain.nativeCurrency?.symbol || ''
	const decimals = chain.nativeCurrency?.decimals || 18

    initialState.chains[chainId] = {
        id: chainId.toString(),
        name: chain.name,
        logoURL: chainLogos[chain.id as number] || '',
        explorerURL: explorerURL,
        isCCIP: chainCCIP[chain.id as number]?.isCCIP || false,
        nativeToken: nativeToken,
        decimals: decimals,
        selector: chainSelectors[chain.id as number] || BigInt(0),

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