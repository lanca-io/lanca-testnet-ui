import type { FC, PropsWithChildren } from 'react'
import { TxExecutionStoreProvider } from './tx-execution/TxExecutionStore'
import { ChainsStoreProvider } from './chains/ChainsStore'
import { FormStoreProvider } from './form/FormStore'
import { BalancesStoreProvider } from './balances/BalancesStore'
import { ModalsStoreProvider } from './modals/ModalsStore'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
	return (
		<ChainsStoreProvider>
			<BalancesStoreProvider>
				<FormStoreProvider>
					<ModalsStoreProvider>
						<TxExecutionStoreProvider>{children}</TxExecutionStoreProvider>
					</ModalsStoreProvider>
				</FormStoreProvider>
			</BalancesStoreProvider>
		</ChainsStoreProvider>
	)
}
