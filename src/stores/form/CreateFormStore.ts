import type { FormState, FormStore, FormActions } from './types'
import type { Chain } from '../chains/types'
import type { Address } from 'viem'
import { chainSelectors } from '../chains/ChainInfo'
import { createWithEqualityFn } from 'zustand/traditional'

const defaultSourceChain: Chain = {
	id: '43113',
	name: 'Fuji',
	logoURL: '/Chains/43113.svg',
	explorerURL: 'https://testnet.snowtrace.io',
	isCCIP: true,
	nativeToken: 'AVAX',
	decimals: 18,
	selector: chainSelectors[43113],
	hastCEROFaucet: true,
	disabledLogoURL: '/Chains/Disabled/43113.svg',
}

const defaultDestinationChain: Chain = {
	id: '421614',
	name: 'Arbitrum',
	logoURL: '/Chains/421614.svg',
	explorerURL: 'https://sepolia.arbiscan.io',
	isCCIP: true,
	nativeToken: 'ETH',
	decimals: 18,
	selector: chainSelectors[421614],
	hastCEROFaucet: true,
	disabledLogoURL: '/Chains/Disabled/421614.svg',
}

const initialState: FormState = {
	sourceChain: defaultSourceChain,
	destinationChain: defaultDestinationChain,
	fromAmount: '',
	fromTokenAddress: '0x12433A15b94b95B38adcbB3d7C315328f4C280b6',
	toTokenAddress: '0x2cEAF3Dc8F19FE2addb5461258a2F6bf3Ab35A28',
	isLoading: false,
	error: null,
}

export const CreateFormStore = (): FormStore => {
	return createWithEqualityFn<FormState & FormActions>(
		(set, get) => ({
			...initialState,
			setSourceChain: (chain: Chain) => set({ sourceChain: chain }),
			setDestinationChain: (chain: Chain) => set({ destinationChain: chain }),
			setFromAmount: (amount: string) => {
				set({ fromAmount: amount })
			},
			setLoading: (isLoading: boolean) => {
				set({ isLoading })
			},
			setFromTokenAddress: (address: Address) => {
				set({ fromTokenAddress: address })
			},
			setToTokenAddress: (address: Address) => {
				set({ toTokenAddress: address })
			},
			setError: (error: string | null) => {
				set({ error })
			},
			swapTokensAndChains: () => {
				const { sourceChain, destinationChain, fromTokenAddress, toTokenAddress } = get()
				set({
					sourceChain: destinationChain,
					destinationChain: sourceChain,
					fromTokenAddress: toTokenAddress,
					toTokenAddress: fromTokenAddress,
				})
			},
		}),
		Object.is,
	)
}
