import type { FC } from 'react'
import { memo } from 'react'
import { ProcessHeading } from './ProcessHeading/ProcessHeading'
import { ProcessContent } from './ProcessContent/ProcessContent'
import { useTxExecutionTimer } from '@/hooks/useTxExecutionTimer'
import { TxProgress } from '../TxProgress/TxProgress'
import { ProcessInfo } from './ProcessInfo/ProcessInfo'
import { ProcessAction } from './ProcessAction/ProcessAction'
import { useTxProcess } from '@/hooks/useTxProcess'
import './ProcessCard.pcss'

export const ProcessCard: FC = memo((): JSX.Element => {
	const { currentStage } = useTxProcess()
	useTxExecutionTimer()

	return (
		<>
			<div className={`process_card_${currentStage}`} data-testid={`process-card-${currentStage}`}>
				<div className="process_card">
					<ProcessHeading />
					<ProcessContent />
					<TxProgress />
					<ProcessInfo />
				</div>
			</div>
			<ProcessAction />
		</>
	)
})

ProcessCard.displayName = 'ProcessCard'
