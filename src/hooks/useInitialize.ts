import { useLoadBalances } from './useLoadBalances'

export const InitializeLoadables = (): null => {
	useLoadBalances()
	return null
}