import type { FC } from 'react'
import { useMemo } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { Status, StepType } from '@lanca/sdk'
import './ProcessHeading.pcss'

type HeadingMapType = {
	[key in Status]: string | Partial<Record<StepType, string>>
}

export const ProcessHeading: FC = () => {
	const { txStatus, steps } = useTxExecutionStore()

	const headingMap = useMemo<HeadingMapType>(
		() => ({
			[Status.NOT_STARTED]: 'Initializing...',
			[Status.PENDING]: {
				[StepType.ALLOWANCE]: 'Approval...',
				[StepType.BRIDGE]: 'Transaction...',
			},
			[Status.SUCCESS]: 'Success!',
			[Status.FAILED]: 'Transaction',
			[Status.REJECTED]: 'Transaction',
		}),
		[],
	)

	const activeStep = useMemo<StepType | null>(() => {
		if (steps.ALLOWANCE === Status.PENDING) return StepType.ALLOWANCE
		if (steps.BRIDGE === Status.PENDING) return StepType.BRIDGE
		return null
	}, [steps])

	const heading = useMemo<string>(() => {
		if (txStatus === Status.PENDING && activeStep !== null) {
			const pendingHeadings = headingMap[Status.PENDING] as Partial<Record<StepType, string>>
			return pendingHeadings[activeStep] || 'Initializing...'
		}
		return headingMap[txStatus] as string
	}, [txStatus, activeStep, headingMap])

	return <h4 className="process-card__title">{heading}</h4>
}
