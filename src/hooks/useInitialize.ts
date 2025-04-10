import { useLoadBalances } from './Loadables/useLoadBalances'
import { useLoadNativeBalances } from './Loadables/useLoadNativeBalances'
import { useLoadPosthogInstance } from './Loadables/useLoadPosthogInstance'
import { useLoadTxExecutionTime } from './Loadables/useLoadTxExecutionTime'

export const InitializeLoadables = (): null => {
	useLoadPosthogInstance()
	useLoadBalances()
	useLoadNativeBalances()
	useLoadTxExecutionTime()
	return null
}
