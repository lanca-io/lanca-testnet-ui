import type { PropsWithChildren } from 'react'
import type { FormStore } from './types'
import { CreateFormStore } from './CreateFormStore'
import { useRef } from 'react'
import { FormContext } from './FormContext'

export function FormStoreProvider({ children }: PropsWithChildren<{}>) {
	const storeRef = useRef<FormStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = CreateFormStore()
	}

	return <FormContext.Provider value={storeRef.current}>{children}</FormContext.Provider>
}
