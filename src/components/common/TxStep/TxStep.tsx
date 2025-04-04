import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { capitalizeFirstLetter } from '@/utils/format'
import { StepType, Status } from '@lanca/sdk'
import { Spinner } from '@concero/ui-kit'
import { SuccessIcon } from '@/assets/icons/success'
import { InfoIcon } from '@/assets/icons/info'
import './TxStep.pcss'

type TxStepProps = {
    step: StepType
    status: Status
}

const statusIcons = {
    [Status.NOT_STARTED]: null,
    [Status.PENDING]: <Spinner type="gray" />,
    [Status.REJECTED]: <InfoIcon color="var(--color-danger-600)" />,
    [Status.FAILED]: <InfoIcon color="var(--color-danger-600)" />,
    [Status.SUCCESS]: <SuccessIcon />,
}

export const TxStep: FC<TxStepProps> = memo(({ step, status }): JSX.Element => {
    const stepTitle = useMemo(() => capitalizeFirstLetter(step), [step])
    
    return (
        <div className="tx_step" data-testid={`tx-step-${step}-${status.toLowerCase()}`}>
            {statusIcons[status]}
            <h5 className={`tx_step_title tx_step_${status}`}>{stepTitle}</h5>
        </div>
    )
})