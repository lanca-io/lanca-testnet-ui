import type { FC, PropsWithChildren } from 'react'
import { TxExecutionStoreProvider } from './tx-execution/TxExecutionStore'
import { ChainsStoreProvider } from './chains/ChainsStore'
import { FormStoreProvider } from './form/FormStore'
import { BalancesStoreProvider } from './balances/BalancesStore'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
	return (
		<ChainsStoreProvider>
			<BalancesStoreProvider>
					<FormStoreProvider>
						<TxExecutionStoreProvider>{children}</TxExecutionStoreProvider>
					</FormStoreProvider>
			</BalancesStoreProvider>
		</ChainsStoreProvider>
	)
}
