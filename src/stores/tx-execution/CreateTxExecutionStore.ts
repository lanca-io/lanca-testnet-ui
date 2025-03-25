import type { TxExecutionStateAndActions, TxExecutionStore } from './types'
import { TxStatus, StepStatus, StepType } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

const initialState = {
	txStatus: TxStatus.Idle,
	activeStep: null as StepType | null,
	approval: StepStatus.Idle,
	bridge: StepStatus.Idle,
}

export const CreateTxExecutionStore = (): TxExecutionStore => {
	return createWithEqualityFn<TxExecutionStateAndActions>(
		(set, get) => ({
			...initialState,

			setTxStatus: (status: TxStatus) => {
				set({ txStatus: status })
			},

			setStepStatus: (step: StepType, status: StepStatus) => {
				switch (step) {
					case StepType.Approval:
						set({ approval: status })
						break
					case StepType.Bridge:
						set({ bridge: status })
						break
				}

				if (status === StepStatus.Loading) {
					set({ activeStep: step })
				}

				if (
					(status === StepStatus.Success || status === StepStatus.Failed || status === StepStatus.Rejected) &&
					get().activeStep === step
				) {
					set({ activeStep: null })
				}
			},

			setActiveStep: (step: StepType | null) => {
				set({ activeStep: step })
			},

			getActiveStep: () => get().activeStep,

			startStep: (step: StepType) => {
				const update: Partial<typeof initialState> = {
					txStatus: TxStatus.Loading,
					activeStep: step,
				}

				switch (step) {
					case StepType.Approval:
						update.approval = StepStatus.Loading
						break
					case StepType.Bridge:
						update.bridge = StepStatus.Loading
						break
				}

				set(update)
			},

			completeStep: (step: StepType, success: boolean) => {
				const newStatus = success ? StepStatus.Success : StepStatus.Failed

				switch (step) {
					case StepType.Approval:
						set({ approval: newStatus })
						break
					case StepType.Bridge:
						set({ bridge: newStatus })
						break
				}

				if (get().activeStep === step) {
					set({ activeStep: null })
				}

				const { approval, bridge } = get()

				if (approval !== StepStatus.Loading && bridge !== StepStatus.Loading) {
					const txSucceeded =
						approval !== StepStatus.Failed &&
						approval !== StepStatus.Rejected &&
						bridge !== StepStatus.Failed &&
						bridge !== StepStatus.Rejected

					set({ txStatus: txSucceeded ? TxStatus.Success : TxStatus.Failed })
				}
			},

			reset: () => {
				set(initialState)
			},
		}),
		Object.is,
	)
}
