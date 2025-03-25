import type { PropsWithChildren } from 'react'
import type { ChainsStore } from './types'
import { CreateChainsStore } from './CreateChainsStore'
import { useRef } from 'react'
import { ChainsContext } from './ChainsContext'

export function ChainsStoreProvider({ children }: PropsWithChildren<{}>) {
	const storeRef = useRef<ChainsStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = CreateChainsStore()
	}

	return <ChainsContext.Provider value={storeRef.current}>{children}</ChainsContext.Provider>
}
