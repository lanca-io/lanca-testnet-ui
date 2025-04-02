import { useMemo } from 'react'
import { Status, StepType } from '@lanca/sdk'
import { useTxProcess } from './useTxProcess'

type HeadingMapType = {
	[key in Status]: string | Partial<Record<StepType, string>>
}

export const useProcessHeading = () => {
	const { txStatus, currentStep } = useTxProcess()

	const headingMap: HeadingMapType = useMemo(
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

	const heading = useMemo(() => {
		if (txStatus === Status.PENDING && currentStep !== null) {
			const pendingHeadings = headingMap[Status.PENDING] as Partial<Record<StepType, string>>
			return pendingHeadings[currentStep] || 'Initializing...'
		}
		return headingMap[txStatus] as string
	}, [txStatus, currentStep, headingMap])

	return heading
}
