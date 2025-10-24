import type { FC, PropsWithChildren } from 'react'
import type { LancaClient as Client, ILancaClientConfig, IChainWithProvider } from '@lanca/sdk'
import { createContext } from 'react'
import { LancaClient } from '@lanca/sdk'
import { fallback, http } from 'viem'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { convertToViemChains } from '@/utils/chains'

export type SDKContext = {
	client: Client
}

export const SDKContext = createContext<SDKContext | null>(null)

export const SDKProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { chains } = useChainsStore()
	const availableChains = Object.values(chains)
	const viemChains = convertToViemChains(availableChains)

	const options = {
		onFetchResponse(response: Response) {
			if (!response.ok) {
				console.log('RPC node response:', {
					status: response.status,
					node: response.url,
				})
			}
		},
		batch: true,
	}

	const sdkConfiguration: ILancaClientConfig = {
		chains: viemChains.reduce(
			(acc, chain) => {
				acc[chain.id.toString()] = {
					chain,
					provider: fallback(
						chain.rpcUrls.default.http.map((url: string) => http(url, options)),
						{
							retryCount: 1,
							retryDelay: 2000,
						},
					),
				} as IChainWithProvider
				return acc
			},
			{} as Record<string, IChainWithProvider>,
		),
		testnet: true,
	}

	const client = new LancaClient(sdkConfiguration)

	return <SDKContext.Provider value={{ client }}>{children}</SDKContext.Provider>
}
