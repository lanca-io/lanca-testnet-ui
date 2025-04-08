import type { PropsWithChildren } from 'react'
import type { ModalsStore } from './types'
import { CreateModalStore } from './CreateModalsStore'
import { useRef } from 'react'
import { ModalsContext } from './ModalsContext'

export function ModalsStoreProvider({ children }: PropsWithChildren<{}>) {
	const storeRef = useRef<ModalsStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = CreateModalStore()
	}

	return <ModalsContext.Provider value={storeRef.current}>{children}</ModalsContext.Provider>
}
