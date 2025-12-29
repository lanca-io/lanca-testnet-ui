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
		usdc_e: '0x796492c07df889bDe1C99aa2Ca1B099a55a50613',
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
		usdc_e: '0x575ddc76EA5e6909ed5FF690ba7088ecf90D1D86',
		bridge_lbf: '0xC78E5317d401e2E17B78Bc771CA131C99deE36C0',
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
