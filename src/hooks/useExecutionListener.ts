import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { IRouteType } from '@lanca/sdk'

export const useExecutionListener = () => {
	const { setStepStatus, appendStep } = useTxExecutionStore()

	const handleExecutionUpdate = (state: IRouteType) => {
		state.steps.forEach(step => {
			if (step.execution && step.execution.status && step.type) {
				appendStep({ type: step.type, status: step.execution.status })
				setStepStatus(step.type, step.execution.status)
			}
		})
	}

	return handleExecutionUpdate
}
