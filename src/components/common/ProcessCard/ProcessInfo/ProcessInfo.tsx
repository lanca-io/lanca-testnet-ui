import type { FC } from 'react'
import { useTxProcess } from '@/hooks/useTxProcess'
import { Status, StepType } from '@lanca/sdk'
import { Alert } from '../../Alert/Alert'
import { SignIcon } from '@/assets/icons/sign'
import { InfoIcon } from '@/assets/icons/info'
import './ProcessInfo.pcss'

export type FailureStep = 'approval' | 'bridge'
export type FailureReason = 'rejected' | 'failed'

export interface FailureInfoProps {
	step: FailureStep
	reason: FailureReason
}

const ApprovalInfo: FC = (): JSX.Element => (
	<div className="approval-info">
		<div className="approval-info__icon">
			<SignIcon />
		</div>
		<div className="approval-info__text">
			<p className="approval-info__heading">Open your wallet</p>
			<p className="approval-info__subheading">
				Signature required. Please, open your wallet and sign the transaction.
			</p>
		</div>
	</div>
)

const FailureInfo: FC<FailureInfoProps> = ({ step, reason }): JSX.Element => {
	const stepLabels: Record<FailureStep, string> = {
		approval: 'Approval',
		bridge: 'Bridge',
	}

	const reasonLabels: Record<FailureReason, string> = {
		rejected: 'Rejected',
		failed: 'Failed',
	}

	return (
		<Alert
			variant="error"
			title={`${stepLabels[step]} ${reasonLabels[reason]}`}
			icon={<InfoIcon color="#F04438" />}
		/>
	)
}

export const ProcessInfo: FC = (): JSX.Element | null => {
	const { currentStep, txStatus } = useTxProcess()

	const isApprovalPending = currentStep === StepType.ALLOWANCE && txStatus === Status.PENDING
	const failureDetails: FailureInfoProps | null = (() => {
		if (txStatus === Status.REJECTED || txStatus === Status.FAILED) {
			const reason: FailureReason = txStatus === Status.REJECTED ? 'rejected' : 'failed'
			if (currentStep === StepType.ALLOWANCE) return { step: 'approval', reason }
			if (currentStep === StepType.BRIDGE) return { step: 'bridge', reason }
		}
		return null
	})()

	return (
		<>
			{isApprovalPending && <ApprovalInfo />}
			{failureDetails && <FailureInfo step={failureDetails.step} reason={failureDetails.reason} />}
		</>
	)
}
