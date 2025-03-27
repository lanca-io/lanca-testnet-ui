import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional';
import type { StoreApi } from 'zustand/vanilla';
import type { Chain } from '../chains/types';
import type { Address } from 'viem';

export type FormState = {
    sourceChain: Chain | null;
    destinationChain: Chain | null;
    fromTokenAddress: Address;
    toTokenAddress: Address;
    fromAmount: string;
    isLoading: boolean;
    error: string | null;
};

export interface FormActions {
    setSourceChain: (chain: Chain) => void;
    setDestinationChain: (chain: Chain) => void;
    setFromAmount: (amount: string) => void;
    setLoading: (isLoading: boolean) => void;
    setFromTokenAddress: (address: Address) => void;
    setToTokenAddress: (address: Address) => void;
    setError: (error: string | null) => void; 
    swapTokensAndChains: () => void;
}

export type FormStore = UseBoundStoreWithEqualityFn<StoreApi<FormState & FormActions>>;