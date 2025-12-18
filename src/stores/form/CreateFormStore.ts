import { createWithEqualityFn } from 'zustand/traditional'
import type { FormState, FormStore, FormActions } from './types'
import type { ConceroChain } from '../chains/types'
import type { Address } from 'viem'

const defaultSourceChain: ConceroChain = {
	id: 43113,
	name: 'Avalanche Fuji',
	selector: 43113n,
	logo: 'https://dev.concero.io/static/chains/43113.svg',
	nativeCurrency: {
		name: 'Avalanche Fuji',
		symbol: 'AVAX',
		decimals: 18,
	},
	rpcUrls: {
		default: {
			http: [
				'https://api.avax-test.network/ext/bc/C/rpc',
				'https://avalanche-fuji-c-chain-rpc.publicnode.com',
				'https://avalanche-fuji.drpc.org',
				'https://ava-testnet.public.blastapi.io/ext/bc/C/rpc',
				'https://avalanche-fuji.therpc.io',
			],
		},
	},
	explorer: 'https://testnet.snowtrace.io',
	testnet: true,
	contracts: {
		usdc_e: '0x855F39BAAcAF30D7dE448542316A889ee4db4DDb',
		bridge_lbf: '0xBa9B28540836d1037762cF74494cA48331F3b9AD',
	},
}

const defaultDestinationChain: ConceroChain = {
	id: 421614,
	name: 'Arbitrum Sepolia',
	selector: 421614n,
	logo: 'https://dev.concero.io/static/chains/421614.svg',
	nativeCurrency: {
		name: 'ETH',
		symbol: 'ETH',
		decimals: 18,
	},
	rpcUrls: {
		default: {
			http: [
				'https://sepolia-rollup.arbitrum.io/rpc',
				'https://arbitrum-sepolia.gateway.tenderly.co',
				'https://arbitrum-sepolia.drpc.org',
				'https://arbitrum-sepolia-rpc.publicnode.com',
				'https://arbitrum-sepolia.api.onfinality.io/public',
				'https://arbitrum-sepolia.therpc.io',
			],
		},
	},
	explorer: 'https://sepolia.arbiscan.io',
	testnet: true,
	contracts: {
		usdc_e: '0xEFc3Ac3bCB37f0f26eFDE1e1b06609Bdff690604',
		bridge_lbf: '0x4447B927F7a9C386DA37cD4a4aa228e0F550309E',
	},
}

const initialState: FormState = {
	sourceChain: defaultSourceChain,
	destinationChain: defaultDestinationChain,
	fromAmount: '',
	fromTokenAddress: defaultSourceChain.contracts.usdc_e as Address,
	toTokenAddress: defaultDestinationChain.contracts.usdc_e as Address,
	isLoading: false,
	error: null,
}

export const CreateFormStore = (): FormStore => {
	return createWithEqualityFn<FormState & FormActions>(
		(set, get) => ({
			...initialState,
			setSourceChain: (chain: ConceroChain) => set({ sourceChain: chain }),
			setDestinationChain: (chain: ConceroChain) => set({ destinationChain: chain }),
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
