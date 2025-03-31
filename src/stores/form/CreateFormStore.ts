import type { FormState, FormStore, FormActions } from './types'
import type { Chain } from '../chains/types'
import type { Address } from 'viem'
import { createWithEqualityFn } from 'zustand/traditional'

const defaultSourceChain: Chain = {
    id: "421614",
    name: "Arbitrum Sepolia",
    logoURL: '/Chains/421614.svg',
    explorerURL: "https://sepolia.arbiscan.io",
    isCCIP: true,
    nativeToken: 'ETH',
    decimals: 18,
    selector: BigInt(3478487238524512256),
};

const defaultDestinationChain: Chain = {
    id: "84532",
    name: 'Base Sepolia',
    logoURL: '/Chains/84532.svg',
    explorerURL: "https://sepolia.basescan.org",
    isCCIP: true,
    nativeToken: 'ETH',
    decimals: 18,
    selector: BigInt(10344971235874465080),
};

const initialState: FormState = {
    sourceChain: defaultSourceChain,
    destinationChain: defaultDestinationChain,
    fromAmount: '',
    fromTokenAddress: '0x2cEAF3Dc8F19FE2addb5461258a2F6bf3Ab35A28',
    toTokenAddress: '0x8f71b09A17e870b256E95aF13c6751384e8Cec30',
    isLoading: false,
    error: null,
};

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
