import type { FC } from 'react'
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

export const TxStep: FC<TxStepProps> = ({ step, status }): JSX.Element => {
	return (
		<div className="tx-step">
			{statusIcons[status]}
			<h5 className={`tx-step__title tx-step__${status}`}>{capitalizeFirstLetter(step)}</h5>
		</div>
	)
}
