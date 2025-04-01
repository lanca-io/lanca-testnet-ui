import { useExecutionListener } from './useExecutionListener'
import { getWalletClient } from '@wagmi/core'
import { adapter } from '@/configuration/wagmi'
import { IExecutionConfig, IRouteType } from '@lanca/sdk'
import { useSDK } from './useSDK'

export const useExecuteRoute = (route: IRouteType | null) => {
	const sdk = useSDK()

	const handleExecutionUpdate = useExecutionListener()

	const executionConfig: IExecutionConfig = {
		updateRouteStatusHook: handleExecutionUpdate,
	}

	const executeRoute = async () => {
		if (!route) return null
		try {
			const chainId = Number(route.from.chain.id)
			const client = await getWalletClient(adapter.wagmiConfig, { chainId: chainId })
			// @ts-ignore
			const tx = await sdk.executeRoute(route, client, executionConfig)
			return tx
		} catch (error) {
			console.error('Error executing route:', error)
			throw error
		}
	}

	return executeRoute
}
