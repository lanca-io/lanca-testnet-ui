import type { PropsWithChildren } from 'react'
import type { BalancesStore } from './types'
import { CreateBalancesStore } from './CreateBalancesStore'
import { useRef } from 'react'
import { BalancesContext } from './BalancesContext'

export function BalancesStoreProvider({ children }: PropsWithChildren<{}>) {
	const storeRef = useRef<BalancesStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = CreateBalancesStore()
	}

	return <BalancesContext.Provider value={storeRef.current}>{children}</BalancesContext.Provider>
}
