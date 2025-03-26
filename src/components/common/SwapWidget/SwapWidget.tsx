import { FC } from 'react'
import { SourceCard } from './SourceCard/SourceCard'
import { DestinationCard } from './DestinationCard/DestinationCard'
import { CardSwitcher } from '../CardSwitcher/CardSwitcher'
import { SwapCard } from './SwapCard/SwapCard'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'

import "./SwapWidget.pcss"
import { useChainsStore } from '@/stores/chains/useChainsStore'

export const SwapWidget: FC = () => {
	const { nativeBalances } = useBalancesStore()
	const { chains } = useChainsStore() 

	console.log(chains)
	console.log("nativeBalances", nativeBalances)
	return (
		<div className="swap-widget">
			<SourceCard />
			<CardSwitcher />
			<DestinationCard />
			<SwapCard />
		</div>
	)
}
