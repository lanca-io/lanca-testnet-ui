import { FC } from 'react'
import { SourceCard } from './SourceCard/SourceCard'
import { DestinationCard } from './DestinationCard/DestinationCard'
import { CardSwitcher } from '../CardSwitcher/CardSwitcher'
import "./SwapWidget.pcss"
import { SwapCard } from './SwapCard/SwapCard'

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
