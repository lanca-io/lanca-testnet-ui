import { useLoadBalances } from './Loadables/useLoadBalances'
import { useLoadNativeBalance } from './Loadables/useLoadNativeBalance'
import { useLoadPosthogInstance } from './Loadables/useLoadPosthogInstance'
import { useLoadTxExecutionTime } from './Loadables/useLoadTxExecutionTime'
import { useLoadChains } from './Loadables/useLoadChains'

export const InitializeLoadables = (): null => {
	useLoadChains()
	useLoadPosthogInstance()
	useLoadBalances()
	useLoadNativeBalance()
	useLoadTxExecutionTime()
	return null
}
