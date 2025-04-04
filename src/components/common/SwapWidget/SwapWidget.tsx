import { FC, useMemo, memo } from 'react'
import { SourceCard } from './SourceCard/SourceCard'
import { DestinationCard } from './DestinationCard/DestinationCard'
import { CardSwitcher } from '../CardSwitcher/CardSwitcher'
import { SwapCard } from './SwapCard/SwapCard'
import { ProcessCard } from '../ProcessCard/ProcessCard'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import './SwapWidget.pcss'

export const SwapWidget: FC = memo(() => {
	const { txStatus } = useTxExecutionStore()

	const Card = useMemo(() => {
		switch (txStatus) {
			case 'PENDING':
			case 'SUCCESS':
			case 'REJECTED':
			case 'FAILED':
				return <ProcessCard />
			default:
				return (
					<>
						<SourceCard />
						<CardSwitcher />
						<DestinationCard />
						<SwapCard />
					</>
				)
		}
	}, [txStatus])

	return (
		<div className="swap_widget" data-testid="swap-widget">
			{Card}
		</div>
	)
})
