import type { FormState, FormStore, FormActions } from './types'
import type { Chain } from '../chains/types'
import { createWithEqualityFn } from 'zustand/traditional'

const defaultSourceChain: Chain = {
    id: '11155111',
    name: 'Sepolia',
    logoURL: '/Chains/11155111.svg',
    explorerURL: 'https://sepolia.etherscan.io',
}

const defaultDestinationChain: Chain = {
    id: '11155420',
    name: 'OP Sepolia',
    logoURL: '/Chains/11155420.svg',
    explorerURL: 'https://sepolia-optimism.etherscan.io',
}

const initialState: FormState = {
    sourceChain: defaultSourceChain,
    destinationChain: defaultDestinationChain,
    fromAmount: '',
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
            swapChains: () => {
                const { sourceChain, destinationChain } = get()
                set({ sourceChain: destinationChain, destinationChain: sourceChain })
            },
        }),
        Object.is,
    )
}