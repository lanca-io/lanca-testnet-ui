import { useLoadBalances } from './Loadables/useLoadBalances'
import { useLoadNativeBalances } from './Loadables/useLoadNativeBalances'
import { useLoadPosthogInstance } from './Loadables/useLoadPosthogInstance'

export const InitializeLoadables = (): null => {
	useLoadPosthogInstance()
	useLoadBalances()
	useLoadNativeBalances()
	return null
}
