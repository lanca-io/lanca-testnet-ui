import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'
import type { Chain } from '../chains/types'

export type FormState = {
    sourceChain: Chain | null
    destinationChain: Chain | null
    fromAmount: string
    isLoading: boolean
}

export interface FormActions {
    setSourceChain: (chain: Chain) => void
    setDestinationChain: (chain: Chain) => void
    setFromAmount: (amount: string) => void
    setLoading: (isLoading: boolean) => void
    swapChains: () => void
}

export type FormStore = UseBoundStoreWithEqualityFn<StoreApi<FormState & FormActions>>