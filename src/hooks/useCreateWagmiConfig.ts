import type { Config } from 'wagmi'
import type { ConceroChain } from '@/stores/chains/types'
import { http } from 'wagmi'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { domain_url, project_id } from '@/configuration/constants'

const metadata = {
    name: 'Concero',
    description: 'Concero',
    url: domain_url,
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

let appKitInstance: ReturnType<typeof createAppKit> | null = null

export const createDynamicWagmiConfig = (chains: ConceroChain[]): Config => {
    const viemChains = chains.map(chain => ({
        id: chain.id,
        name: chain.name,
        nativeCurrency: chain.nativeCurrency,
        rpcUrls: chain.rpcUrls,
        testnet: chain.testnet,
    }))

    const transports = viemChains.reduce((acc, chain) => {
        acc[chain.id] = http(chain.rpcUrls.default.http[0])
        return acc
    }, {} as Record<number, ReturnType<typeof http>>)

    const adapter = new WagmiAdapter({
        networks: viemChains as any,
        transports,
        projectId: project_id,
    })

    if (!appKitInstance) {
        appKitInstance = createAppKit({
            adapters: [adapter],
            networks: viemChains as any,
            metadata,
            projectId: project_id,
            enableWalletGuide: true,
            features: {
                send: false,
                socials: false,
                analytics: true,
                email: false,
                onramp: false,
                swaps: false,
                legalCheckbox: true,
            },
        })
    }

    return adapter.wagmiConfig
}
