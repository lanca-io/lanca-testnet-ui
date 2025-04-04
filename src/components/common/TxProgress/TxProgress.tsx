import { FC, memo, useMemo } from 'react'
import { TxStep } from '../TxStep/TxStep'
import { RightIcon } from '@/assets/icons/right'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { Status, StepType } from '@lanca/sdk'
import './TxProgress.pcss'

export const TxProgress: FC = memo((): JSX.Element | null => {
    const { txStatus, steps } = useTxExecutionStore()

    const stepsContent = useMemo(
        () => (
            <>
                <TxStep step={StepType.ALLOWANCE} status={steps.ALLOWANCE} />
                <RightIcon />
                <TxStep step={StepType.BRIDGE} status={steps.BRIDGE} />
            </>
        ),
        [steps],
    )

    if (txStatus === Status.SUCCESS) return null

    return <div className="tx_progress" data-testid="tx-progress">{stepsContent}</div>
})

TxProgress.displayName = 'TxProgress'