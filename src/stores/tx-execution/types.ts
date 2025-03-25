import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export enum StepType {
	Approval = 'approval',
	Bridge = 'bridge',
}

export enum StepStatus {
	Idle = 'idle',
	Loading = 'loading',
	Success = 'success',
	Failed = 'failed',
	Rejected = 'rejected',
}




export enum TxStatus {
	Idle = 'idle',
	Loading = 'loading',
	Success = 'success',
	Failed = 'failed',
	Rejected = 'rejected',
}

export type TxExecutionState = {
	txStatus: TxStatus
	activeStep: StepType | null
	approval: StepStatus
	bridge: StepStatus
}

export interface TxExecutionActions {
	setTxStatus: (status: TxStatus) => void
	setStepStatus: (step: StepType, status: StepStatus) => void
	setActiveStep: (step: StepType | null) => void
	getActiveStep: () => StepType | null
	startStep: (step: StepType) => void
	completeStep: (step: StepType, success: boolean) => void
	reset: () => void
}
export type TxExecutionStateAndActions = TxExecutionState & TxExecutionActions

export type TxExecutionStore = UseBoundStoreWithEqualityFn<StoreApi<TxExecutionStateAndActions>>
