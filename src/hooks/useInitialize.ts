import { useLoadBalances } from './Loadables/useLoadBalances'
import { useLoadSelectedBalances } from './Loadables/useLoadSelectedBalances'
import { useLoadNativeBalance } from './Loadables/useLoadNativeBalance'
import { useLoadPosthogInstance } from './Loadables/useLoadPosthogInstance'
import { useLoadTxExecutionTime } from './Loadables/useLoadTxExecutionTime'
import { useLoadChains } from './Loadables/useLoadChains'

export const InitializeLoadables = (): null => {
	useLoadChains()
	useLoadPosthogInstance()
	useLoadSelectedBalances()
	useLoadBalances()
	useLoadNativeBalance()
	useLoadTxExecutionTime()
	return null
}
