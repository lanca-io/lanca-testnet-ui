import type { AppKitNetwork } from '@reown/appkit/networks'
import type { Transport } from 'viem'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { domain_url, project_id } from '@/configuration/constants'
import { ConceroChain, convertToViemChains, createTransports } from '@/utils/chains'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useLoadChains } from '@/hooks/Loadables/useLoadChains'
import { ScreenLoader } from '@/components/common/ScreenLoader/ScreenLoader'
import { ErrorBoundary } from '@/components/common/ErrorBoundary/ErrorBoundary'
import { WagmiProvider } from 'wagmi'

const metadata = {
    name: 'Concero',
    description: 'Concero',
    url: domain_url,
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const appKitFeatures = {
    send: false,
    socials: false,
    analytics: true,
    email: false,
    onramp: false,
    swaps: false,
	activity: false,
    legalCheckbox: true,
} as const

let wagmiAdapter: WagmiAdapter | null = null
let appKit: ReturnType<typeof createAppKit> | null = null

export function initializeAppKit(chains: ConceroChain[], transports: Record<number, Transport>) {
    if (appKit) return { wagmiAdapter, appKit } 
    
    const viemChains = convertToViemChains(chains)
    
    wagmiAdapter = new WagmiAdapter({
        networks: viemChains,
        transports,
        projectId: project_id,
    })

    appKit = createAppKit({
        adapters: [wagmiAdapter],
        networks: viemChains as [AppKitNetwork, ...AppKitNetwork[]],
        metadata,
        projectId: project_id,
        enableWalletGuide: true,
        features: appKitFeatures,
    })

    return { wagmiAdapter, appKit }
}

export function getWagmiAdapter() {
    if (!wagmiAdapter) throw new Error('AppKit not initialized')
    return wagmiAdapter
}

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
    const { chains, loading } = useLoadChains()
    const [adapter, setAdapter] = useState<WagmiAdapter | null>(null)

    useEffect(() => {
        if (chains.length > 0 && !adapter) {
            const transports = createTransports(chains)
            const { wagmiAdapter } = initializeAppKit(chains, transports)
            setAdapter(wagmiAdapter)
        }
    }, [chains, adapter])

    if (loading) {
        return <ScreenLoader />
    }

    if (!adapter || chains.length === 0) {
        return <ErrorBoundary />
    }

    return <WagmiProvider config={adapter.wagmiConfig}>{children}</WagmiProvider>
}
