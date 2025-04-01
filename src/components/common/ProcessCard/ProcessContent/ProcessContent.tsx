import type { FC } from 'react'
import { useMemo } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { Approval } from './Approval/Approval'
import { Bridge } from './Bridge/Bridge'
import { Failure } from './Failure/Failure'
import { Success } from './Success/Success'
import { Status, StepType } from '@lanca/sdk'
import './ProcessContent.pcss'

export const ProcessContent: FC = (): JSX.Element | null => {
	const { txStatus, steps } = useTxExecutionStore()

	const activeStep = useMemo(() => {
		if (steps.ALLOWANCE === Status.PENDING) return StepType.ALLOWANCE
		if (steps.BRIDGE === Status.PENDING) return StepType.BRIDGE
		return null
	}, [steps])

	const content = useMemo(() => {
		switch (txStatus) {
			case Status.FAILED:
			case Status.REJECTED:
				return <Failure />
			case Status.SUCCESS:
				return <Success />
			case Status.PENDING:
				if (activeStep === StepType.ALLOWANCE) return <Approval />
				if (activeStep === StepType.BRIDGE) return <Bridge />
				return null
			default:
				return null
		}
	}, [txStatus, activeStep])

	return <div className="process-content">{content}</div>
}
