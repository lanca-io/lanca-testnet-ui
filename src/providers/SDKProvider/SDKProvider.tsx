import type { FC, PropsWithChildren } from 'react'
import type { LancaClient as Client } from '@lanca/sdk'
import { createContext } from 'react'
import { LancaClient } from '@lanca/sdk'

export type SDKContext = {
    client: Client;
}

const initialContext: SDKContext = {
	client: new LancaClient(),
}

export const SDKContext = createContext<SDKContext>(initialContext)

export const SDKProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const client = new LancaClient()

	return <SDKContext.Provider value={{ client }}>{children}</SDKContext.Provider>
}