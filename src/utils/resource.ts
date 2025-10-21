import { fetchChainConfiguration } from '@/utils/chains'
import type { ConceroChain } from '@/stores/chains/types'


export type ResourceStatus = 'pending' | 'success' | 'error'

export type ResourceState<T> = {
    status: ResourceStatus
    data?: T
    error?: Error
    promise?: Promise<void>
}

export type Resource<T> = {
    read(): T
    preload(): void
    reset(): void
    peek(): T | undefined
    getStatus(): ResourceStatus
}

export type ResourceConfig<T> = {
    fetcher: () => Promise<T>
    onSuccess?: (data: T) => void
    onError?: (error: Error) => void
    cacheTime?: number
}

export const createResource = <T>(config: ResourceConfig<T>): Resource<T> => {
    let state: ResourceState<T> = {
        status: 'pending'
    }
    
    let cacheTimer: NodeJS.Timeout | null = null

    const fetch = async (): Promise<void> => {
        try {
            const data = await config.fetcher()
            state = {
                status: 'success',
                data,
            }
            config.onSuccess?.(data)

            if (config.cacheTime) {
                cacheTimer = setTimeout(() => {
                    state = { status: 'pending' }
                }, config.cacheTime)
            }
        } catch (error) {
            const err = error as Error
            state = {
                status: 'error',
                error: err,
            }
            config.onError?.(err)
        }
    }

    return {
        read(): T {
            if (state.status === 'pending') {
                if (!state.promise) {
                    state.promise = fetch()
                }
                throw state.promise
            }

            if (state.status === 'error') {
                throw state.error
            }

            return state.data!
        },

        preload(): void {
            if (state.status === 'pending' && !state.promise) {
                state.promise = fetch()
            }
        },

        reset(): void {
            if (cacheTimer) {
                clearTimeout(cacheTimer)
                cacheTimer = null
            }
            state = { status: 'pending' }
        },

        peek(): T | undefined {
            return state.data
        },

        getStatus(): ResourceStatus {
            return state.status
        }
    }
}



const fetchChains = async (): Promise<ConceroChain[]> => {
    const response = await fetchChainConfiguration(true)
    
    return response.payload.items
        .map((item: any) => {
            const usdc_e = item.deployments.find((d: any) => d.type === 'usdc_e')?.address
            const bridge_lbf = item.deployments.find((d: any) => d.type === 'bridge_lbf')?.address
            const rpcs = Array.isArray(item.chain.rpcs) ? item.chain.rpcs.filter(Boolean) : []

            if (!usdc_e || !bridge_lbf || rpcs.length === 0) return null

            return {
                id: Number(item.chain.id),
                name: item.chain.name,
                selector: item.chain.concero_selector ? BigInt(item.chain.concero_selector) : 0n,
                logo: `https://api.v2.concero.io/static/chains/${item.chain.id}.svg`,
                nativeCurrency: {
                    name: item.chain.native_currency_name,
                    symbol: item.chain.native_currency_symbol,
                    decimals: item.chain.native_currency_decimals,
                },
                rpcUrls: { default: { http: rpcs } },
                explorer: item.chain.explorer,
                testnet: item.chain.is_testnet,
                contracts: { usdc_e, bridge_lbf },
            }
        })
        .filter(Boolean) as ConceroChain[]
}

export const chainResource = createResource<ConceroChain[]>({ fetcher: fetchChains })
