import { FC, useMemo } from 'react'
import { useTxExecutionStore } from '@/hooks/useTxExecutionStore'
import { TxProgress } from '../TxProgress/TxProgress'
import { StepType, TxStatus } from '@/stores/tx-execution/types'
import './ProcessCard.pcss'

type HeadingMapType = {
	[TxStatus.Idle]: string
	[TxStatus.Loading]: Record<StepType, string>
	[TxStatus.Success]: string
	[TxStatus.Failed]: string
	[TxStatus.Rejected]: string
}

const ProcessHeading: FC<{ txStatus: TxStatus; activeStep: StepType | null }> = ({ txStatus, activeStep }) => {
	const headingMap = useMemo<HeadingMapType>(
		() => ({
			[TxStatus.Idle]: 'Initializing...',
			[TxStatus.Loading]: {
				[StepType.Approval]: 'Approval...',
				[StepType.Bridge]: 'Transaction...',
			},
			[TxStatus.Success]: 'Success!',
			[TxStatus.Failed]: 'Transaction Failed',
			[TxStatus.Rejected]: 'Transaction Rejected',
		}),
		[],
	)

	const heading = useMemo<string>(() => {
		if (txStatus === TxStatus.Loading && activeStep !== null) {
			return headingMap[TxStatus.Loading][activeStep]
		}
		return headingMap[txStatus] as string
	}, [txStatus, activeStep, headingMap])

	return <h4 className="process-card__title">{heading}</h4>
}


export const ProcessContent: FC = (): JSX.Element => {
    return (
        <>
        </>
    )
}

export const ProcessCard: FC = (): JSX.Element => {
	const { txStatus, approval, bridge, activeStep } = useTxExecutionStore()

	return (
		<div className="process-card">
			<ProcessHeading txStatus={txStatus} activeStep={activeStep} />
			<TxProgress approvalStatus={approval} bridgeStatus={bridge} />
		</div>
	)
}
