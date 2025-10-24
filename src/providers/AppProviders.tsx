import type { FC, PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Web3Provider } from './Web3Provider/Web3Provider'
import { PosthogProvider } from './PosthogProvider/PosthogProvider'
import { StoreProvider } from '@/stores/StoreProvider'
import { InitializeLoadables } from '@/hooks/useInitialize'
import { SDKProvider } from './SDKProvider/SDKProvider'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@concero/ui-kit'
import { QueryConfiguration } from '@/configuration/query'

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return (
		<HelmetProvider>
			<PosthogProvider>
				<QueryClientProvider client={QueryConfiguration}>
					<StoreProvider>
						<Web3Provider>
							<SDKProvider>
								<InitializeLoadables />
								<ThemeProvider useSystemTheme>{children}</ThemeProvider>
							</SDKProvider>
						</Web3Provider>
					</StoreProvider>
				</QueryClientProvider>
			</PosthogProvider>
		</HelmetProvider>
	)
}
