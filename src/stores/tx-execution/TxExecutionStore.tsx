import type { PropsWithChildren } from 'react'
import type { TxExecutionStore } from './types'
import { CreateTxExecutionStore } from './CreateTxExecutionStore'
import { useRef } from 'react'
import { TxExecutionContext } from './TxExecutionContext'

export function TxExecutionStoreProvider({ children }: PropsWithChildren<{}>) {
	const storeRef = useRef<TxExecutionStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = CreateTxExecutionStore()
	}

	return <TxExecutionContext.Provider value={storeRef.current}>{children}</TxExecutionContext.Provider>
}
