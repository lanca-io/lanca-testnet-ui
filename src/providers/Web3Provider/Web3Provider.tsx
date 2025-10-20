import { useChainsStore } from "@/stores/chains/useChainsStore"
import { WagmiProvider } from "wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryConfiguration } from "@/configuration/query"
import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { domain_url } from "@/configuration/constants"
import type { PropsWithChildren } from "react"

const metadata = {
  name: 'Concero',
  description: 'Concero',
  url: domain_url,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}
export const Web3Provider = ({ children }: PropsWithChildren<{}>) => {
  const { chains, loading } = useChainsStore()
  
  if (loading) return null

  // Dynamically create Wagmi adapter/client and AppKit
  const wagmiAdapter = new WagmiAdapter({
    networks: chains,
    transports,
    projectId: project_id,
  })
  const appKitConfig = createAppKit({
    adapters: [wagmiAdapter],
    networks: chains,
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

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} reconnectOnMount={true}>
      <QueryClientProvider client={QueryConfiguration}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
