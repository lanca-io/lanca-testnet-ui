import type { FormState, FormStore, FormActions } from './types'
import type { Chain } from '../chains/types'
import type { Address } from 'viem'
import { createWithEqualityFn } from 'zustand/traditional'

const defaultSourceChain: Chain = {
    id: '11155111',
    name: 'Sepolia',
    logoURL: '/Chains/11155111.svg',
    explorerURL: 'https://sepolia.etherscan.io',
    isCCIP: true,
    nativeToken: 'ETH',
    decimals: 18,
}

const defaultDestinationChain: Chain = {
    id: '11155420',
    name: 'OP Sepolia',
    logoURL: '/Chains/11155420.svg',
    explorerURL: 'https://sepolia-optimism.etherscan.io',
    isCCIP: true,
    nativeToken: 'ETH',
    decimals: 18,
}

const initialState: FormState = {
    sourceChain: defaultSourceChain,
    destinationChain: defaultDestinationChain,
    fromAmount: '',
    fromTokenAddress: '0xAebaE199236FDaDF2987DC9ae9a9563dd90Da58a',
    toTokenAddress: '0xB33742cb308bB1663Dbe8dD73F80612D1dfC1365',
    isLoading: false,
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
            swapTokensAndChains: () => {
                const { sourceChain, destinationChain, fromTokenAddress, toTokenAddress } = get()
                set({
                    sourceChain: destinationChain,
                    destinationChain: sourceChain,
                    fromTokenAddress: toTokenAddress,
                    toTokenAddress: fromTokenAddress
                })
            },
        }),
        Object.is,
    )
}