import type { TxExecutionStateAndActions, TxExecutionStore } from './types'
import { createWithEqualityFn } from 'zustand/traditional'
import { Status, StepType } from '@lanca/sdk'

const initialState = {
	txStatus: Status.NOT_STARTED,
	steps: {
		ALLOWANCE: Status.NOT_STARTED,
		BRIDGE: Status.NOT_STARTED,
	},
}

// Helper function to calculate the overall transaction status
const calculateTxStatus = (steps: { ALLOWANCE: Status; BRIDGE: Status }): Status => {
	const statuses = Object.values(steps)

	if (statuses.includes(Status.REJECTED)) {
		return Status.REJECTED
	}

	if (statuses.includes(Status.FAILED)) {
		return Status.FAILED
	}

	if (statuses.every(status => status === Status.SUCCESS)) {
		return Status.SUCCESS
	}

	if (statuses.some(status => status === Status.PENDING)) {
		return Status.PENDING
	}

	return Status.NOT_STARTED
}

export const CreateTxExecutionStore = (): TxExecutionStore => {
	return createWithEqualityFn<TxExecutionStateAndActions>(
		(set, get) => ({
			...initialState,

			setStepStatus: (stepType: StepType, status: Status) => {
				if (stepType === 'ALLOWANCE' || stepType === 'BRIDGE') {
					set(state => ({
						steps: {
							...state.steps,
							[stepType]: status,
						},
					}))

					const { steps } = get()
					const overallStatus = calculateTxStatus(steps)
					set({ txStatus: overallStatus })
				}
			},

			// Reset the store to its initial state
			reset: () => {
				set(initialState)
			},
		}),
		Object.is,
	)
}
