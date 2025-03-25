import type { FC } from 'react'
import { capitalizeFirstLetter } from '@/utils/format'
import { StepStatus, StepType } from '@/stores/tx-execution/types'
import { Spinner } from '@concero/ui-kit'
import { SuccessIcon } from '@/assets/icons/success'
import { InfoIcon } from '@/assets/icons/info'
import './TxStep.pcss'

type TxStepProps = {
	step: StepType
	status: StepStatus
}

const statusIcons = {
	[StepStatus.Idle]: null,
	[StepStatus.Loading]: <Spinner type="gray" />,
	[StepStatus.Rejected]: <InfoIcon color="var(--color-danger-600)" />,
	[StepStatus.Failed]: <InfoIcon color="var(--color-danger-600)" />,
	[StepStatus.Success]: <SuccessIcon />,
}

export const TxStep: FC<TxStepProps> = ({ step, status }): JSX.Element => {
	return (
		<div className="tx-step">
			{statusIcons[status]}
			<h5 className={`tx-step__title tx-step__${status}`}>{capitalizeFirstLetter(step)}</h5>
		</div>
	)
}
