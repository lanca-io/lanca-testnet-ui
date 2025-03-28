import { useLoadBalances } from './Loadables/useLoadBalances'
import { useLoadNativeBalances } from './Loadables/useLoadNativeBalances'

export const InitializeLoadables = (): null => {
	useLoadBalances()
	useLoadNativeBalances()
	return null
}
