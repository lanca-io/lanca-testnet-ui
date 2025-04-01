import { FC } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { ProcessHeading } from './ProcessHeading/ProcessHeading'
import { TxProgress } from '../TxProgress/TxProgress'
import { ProcessContent } from './ProcessContent/ProcessContent'
import './ProcessCard.pcss'

export const ProcessCard: FC = (): JSX.Element => {
	const { txStatus, approval, bridge, activeStep } = useTxExecutionStore()

	return (
		<div className="process-card">
			<ProcessHeading txStatus={txStatus} activeStep={activeStep} />
			<ProcessContent />
			<TxProgress approvalStatus={approval} bridgeStatus={bridge} />
		</div>
	)
}
