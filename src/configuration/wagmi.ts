import type { Metadata } from '@reown/appkit/react'
import { chains, transports } from './chains'
import { domain_url, project_id } from './constants'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const metadata: Metadata = {
	name: 'Concero',
	description: 'Concero',
	url: domain_url,
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const adapter = new WagmiAdapter({
	networks: chains,
	transports,
	projectId: 'concero',
})

createAppKit({
	adapters: [adapter],
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
