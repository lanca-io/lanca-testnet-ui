import { FC } from 'react'
import { SourceCard } from './SourceCard/SourceCard'
import { DestinationCard } from './DestinationCard/DestinationCard'
import { CardSwitcher } from '../CardSwitcher/CardSwitcher'
import { SwapCard } from './SwapCard/SwapCard'
import "./SwapWidget.pcss"

export const SwapWidget: FC = () => {
	return (
		<div className="swap-widget">
			<SourceCard />
			<CardSwitcher />
			<DestinationCard />
			<SwapCard />
		</div>
	)
}
