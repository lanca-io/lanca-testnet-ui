import type { FC, PropsWithChildren } from 'react'
import { Web3Provider } from './Web3Provider/Web3Provider'
import { PosthogProvider } from './PosthogProvider/PosthogProvider'
import { StoreProvider } from '@/stores/StoreProvider'
import { InitializeLoadables } from '@/hooks/useInitialize'

export const AppProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<PosthogProvider>
			<Web3Provider>
				<StoreProvider>
					<InitializeLoadables />
					{children}
				</StoreProvider>
			</Web3Provider>
		</PosthogProvider>
	)
}
