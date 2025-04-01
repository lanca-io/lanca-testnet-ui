import type { TxExecutionStateAndActions, TxExecutionStore, ExecutionStep } from './types'
import type { StepType } from '@lanca/sdk'
import { createWithEqualityFn } from 'zustand/traditional'
import { Status } from '@lanca/sdk'

const initialState = {
	txStatus: Status.NOT_STARTED,
	steps: [] as ExecutionStep[],
	activeStep: null as StepType | null,
	error: null as string | null,
}

export const CreateTxExecutionStore = (): TxExecutionStore => {
	return createWithEqualityFn<TxExecutionStateAndActions>(
		(set, get) => ({
			...initialState,

			setTxStatus: (status: Status) => {
				set({ txStatus: status })
			},

			setStepStatus: (stepType: StepType, status: Status) => {
				set(state => ({
					steps: state.steps.map(step => (step.type === stepType ? { ...step, status } : step)),
				}))

				if (status === Status.PENDING) {
					set({ activeStep: stepType })
				}

				if (
					[Status.SUCCESS, Status.FAILED, Status.REJECTED].includes(status) &&
					get().activeStep === stepType
				) {
					set({ activeStep: null })
				}
			},

			setActiveStep: (step: StepType | null) => {
				set({ activeStep: step })
			},
			appendStep: (step: ExecutionStep) => {
				set(state => {
					const exists = state.steps.some(s => s.type === step.type)
					if (!exists) {
						return { steps: [...state.steps, step] }
					}
					return state
				})
			},
			updateStep: (stepType: StepType, updates: Partial<ExecutionStep>) => {
				set(state => ({
					steps: state.steps.map(step => (step.type === stepType ? { ...step, ...updates } : step)),
				}))
			},
			setError: (error: string | null) => {
				set({ error })
			},
			reset: () => {
				set(initialState)
			},
		}),
		Object.is,
	)
}
