import type { FC } from 'react'
import { NotWhitelisted } from '../common/NotWhitelisted/NotWhitelisted'
import { GetTokens } from '../common/GetTokens/GetTokens'

import './Swap.pcss'
import { SwapWidget } from '../common/SwapWidget/SwapWidget'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'

export const Swap: FC = () => {
	const isWhitelisted = true
	const hasTokens = true
	const { chains } = useChainsStore()
	const { balances } = useBalancesStore()

	console.log(balances)

	console.log(chains)

	return (
		<div className="swap">
			<SwapWidget />
			{!isWhitelisted && <NotWhitelisted />}
			{!hasTokens && <GetTokens />}
		</div>
	)
}
