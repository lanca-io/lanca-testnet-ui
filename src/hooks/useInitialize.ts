import { useLoadBalances } from './Loadables/useLoadBalances'
import { useLoadSelectedBalances } from './Loadables/useLoadSelectedBalances'
import { useLoadNativeBalance } from './Loadables/useLoadNativeBalance'
import { useLoadPosthogInstance } from './Loadables/useLoadPosthogInstance'
import { useLoadTxExecutionTime } from './Loadables/useLoadTxExecutionTime'

export const InitializeLoadables = (): null => {
	useLoadPosthogInstance()
	useLoadSelectedBalances()
	useLoadBalances()
	useLoadNativeBalance()
	useLoadTxExecutionTime()
	return null
}
