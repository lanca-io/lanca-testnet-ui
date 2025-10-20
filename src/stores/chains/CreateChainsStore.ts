import type { ChainsState, ChainsActions, ConceroChain, ChainId } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateChainsStore = () =>
    createWithEqualityFn<ChainsState & ChainsActions>(
        set => ({
            chains: {},
            loading: false,
            
            setChains: (chains: ConceroChain[]) =>
                set(() => ({
                    chains: chains.reduce((acc, chain) => {
                        acc[chain.id] = chain;
                        return acc;
                    }, {} as Record<ChainId, ConceroChain>),
                })),
            
            setLoading: (loading: boolean) => set({ loading })
        }),
        Object.is,
    )
