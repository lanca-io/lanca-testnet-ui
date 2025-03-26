import type { FC, PropsWithChildren } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryConfiguration } from '@/configuration/query'
import { adapter } from '@/configuration/wagmi'

export const Web3Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<WagmiProvider config={adapter.wagmiConfig} reconnectOnMount={true}>
			<QueryClientProvider client={QueryConfiguration}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}
