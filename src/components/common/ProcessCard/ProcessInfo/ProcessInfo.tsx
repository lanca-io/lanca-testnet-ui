import type { FC } from 'react'
import { memo, useMemo } from 'react'
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

const ApprovalInfo: FC = memo((): JSX.Element => (
    <div className="approval_info">
        <div className="approval_info_icon">
            <SignIcon />
        </div>
        <div className="approval_info_text">
            <p className="approval_info_heading">Open your wallet</p>
            <p className="approval_info_subheading">
                Signature required. Please, open your wallet and sign the transaction.
            </p>
        </div>
    </div>
))

const FailureInfo: FC<FailureInfoProps> = memo(({ step, reason }): JSX.Element => {
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
            data-testid={`failure-alert-${step}-${reason}`}
        />
    )
})

export const ProcessInfo: FC = memo((): JSX.Element | null => {
    const { currentStep, txStatus } = useTxProcess()

    const isApprovalPending = currentStep === StepType.ALLOWANCE && txStatus === Status.PENDING
    
    const failureDetails = useMemo<FailureInfoProps | null>(() => {
        if (txStatus === Status.REJECTED || txStatus === Status.FAILED) {
            const reason: FailureReason = txStatus === Status.REJECTED ? 'rejected' : 'failed'
            if (currentStep === StepType.ALLOWANCE) return { step: 'approval', reason }
            if (currentStep === StepType.BRIDGE) return { step: 'bridge', reason }
        }
        return null
    }, [txStatus, currentStep])

    return (
        <>
            {isApprovalPending && <ApprovalInfo />}
            {failureDetails && <FailureInfo step={failureDetails.step} reason={failureDetails.reason} />}
        </>
    )
})