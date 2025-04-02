import { useCallback, useRef } from 'react'
import { getWalletClient } from '@wagmi/core'
import { adapter } from '@/configuration/wagmi'
import { IExecutionConfig, IRouteType } from '@lanca/sdk'
import { useSDK } from './useSDK'
import { useExecutionListener } from './useExecutionListener'

export const useExecuteRoute = (route: IRouteType | null) => {
	const sdk = useSDK()
	const updateHandler = useExecutionListener()

	const configRef = useRef<IExecutionConfig>({
		updateRouteStatusHook: updateHandler,
	})

	return useCallback(async () => {
		if (!route) return null

		try {
			const chainId = Number(route.from.chain.id)
			const client = await getWalletClient(adapter.wagmiConfig, { chainId })

			if (!client) throw new Error('Cannot connect to wallet')

			// @ts-ignore
			return await sdk.executeRoute(route, client, configRef.current)
		} catch (error) {
			console.error('Error executing route:', error)
			throw error
		}
	}, [route, sdk, updateHandler])
}
