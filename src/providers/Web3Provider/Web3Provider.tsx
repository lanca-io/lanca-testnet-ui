import type { FC, PropsWithChildren } from 'react'
import type { AppKitNetwork } from '@reown/appkit/networks'
import type { AppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { project_id, domain_url } from '@/configuration/constants'
import { useLoadChains } from '@/hooks/Loadables/useLoadChains'
import { convertToViemChains, createTransports } from '@/utils/chains'

let adapter: WagmiAdapter | null = null
let appKit: AppKit | null = null

const metadata = {
  name: 'Concero',
  description: 'Concero',
  url: domain_url,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const { chains, loading } = useLoadChains()

  if (loading || chains.length === 0) return null
  
  if (!adapter || !appKit) {
    const viemChains = convertToViemChains(chains)
    const transports = createTransports(chains)

    adapter = new WagmiAdapter({
      networks: viemChains,
      transports: transports,
      projectId: project_id,
    })

    appKit = createAppKit({
      adapters: [adapter],
      networks: viemChains as [AppKitNetwork, ...AppKitNetwork[]],
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

  return (
    <WagmiProvider config={adapter.wagmiConfig}>
      {children}
    </WagmiProvider>
  )
}
