import type { IRouteType } from '@lanca/sdk'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'

export const useExecutionListener = () => {
	const { setStepStatus } = useTxExecutionStore()

	const handleExecutionUpdate = (state: IRouteType) => {
		state.steps.forEach(step => {
			if (step.execution && step.execution.status) {
				setStepStatus(step.type, step.execution.status)
			}
		})
	}

	return handleExecutionUpdate
}
