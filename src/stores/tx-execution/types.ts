import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'
import type { StepType, IRouteStep } from '@lanca/sdk'
import { Status } from '@lanca/sdk'

export type ExecutionStep = {
	type: StepType
	status: Status
}

export type TxExecutionState = {
	txStatus: Status
	steps: ExecutionStep[]
	activeStep: StepType | null
	error: string | null
}

export interface TxExecutionActions {
	setTxStatus: (status: Status) => void
	setStepStatus: (stepType: StepType, status: Status) => void
	setActiveStep: (step: StepType | null) => void
	appendStep: (step: ExecutionStep) => void
	updateStep: (stepType: StepType, updates: Partial<ExecutionStep>) => void
	setError: (error: string | null) => void
	reset: () => void
}

export type TxExecutionStateAndActions = TxExecutionState & TxExecutionActions

export type TxExecutionStore = UseBoundStoreWithEqualityFn<StoreApi<TxExecutionStateAndActions>>
