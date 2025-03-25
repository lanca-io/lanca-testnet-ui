import type { FC, PropsWithChildren } from 'react'
import { TxExecutionStoreProvider } from './tx-execution/TxExecutionStore'
import { ChainsStoreProvider } from './chains/ChainsStore'
import { FormStoreProvider } from './form/FormStore'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
	return (
		<ChainsStoreProvider>
			<FormStoreProvider>
				<TxExecutionStoreProvider>{children}</TxExecutionStoreProvider>
			</FormStoreProvider>
		</ChainsStoreProvider>
	)
}
