import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { WagmiProvider } from 'wagmi'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { project_id, domain_url } from '@/configuration/constants'
import { useLoadChains } from '@/hooks/Loadables/useLoadChains'
import { convertToViemChains, createTransports } from '@/utils/chains'
import { ErrorBoundary } from '@/components/common/ErrorBoundary/ErrorBoundary'
import { ScreenLoader } from '@/components/common/ScreenLoader/ScreenLoader'

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
	legalCheckbox: true,
} as const

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
	const { chains, loading } = useLoadChains()

	const { adapter, appKit } = useMemo(() => {
		if (chains.length === 0) return { adapter: null, appKit: null }

		const viemChains = convertToViemChains(chains)
		const transports = createTransports(chains)

		const newAdapter = new WagmiAdapter({
			networks: viemChains,
			transports,
			projectId: project_id,
		})

		const newAppKit = createAppKit({
			adapters: [newAdapter],
			networks: viemChains as [AppKitNetwork, ...AppKitNetwork[]],
			metadata,
			projectId: project_id,
			enableWalletGuide: true,
			features: appKitFeatures,
		})

		return { adapter: newAdapter, appKit: newAppKit }
	}, [chains])

	if (loading) {
		return <ScreenLoader />
	}

	if (chains.length === 0 || !adapter) {
		return <ErrorBoundary />
	}

	return <WagmiProvider config={adapter.wagmiConfig}>{children}</WagmiProvider>
}
