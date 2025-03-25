import type { FC, PropsWithChildren } from 'react'
import { TxExecutionStoreProvider } from './tx-execution/TxExecutionStore'

export const StoreProvider: FC<PropsWithChildren<{}>> = ({ children }): JSX.Element => {
	return <TxExecutionStoreProvider>{children}</TxExecutionStoreProvider>
}
