import { useContext } from 'react'
import { TxExecutionContext } from '../stores/tx-execution/TxExecutionContext'

export const useTxExecutionStore = () => {
	const useStore = useContext(TxExecutionContext)
	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <TxExecutionStoreProvider>.`)
	}

	const txStatus = useStore(state => state.txStatus)
	const activeStep = useStore(state => state.activeStep)
	const approval = useStore(state => state.approval)
	const bridge = useStore(state => state.bridge)

	const setTxStatus = useStore(state => state.setTxStatus)
	const setStepStatus = useStore(state => state.setStepStatus)
	const setActiveStep = useStore(state => state.setActiveStep)
	const getActiveStep = useStore(state => state.getActiveStep)

	const startStep = useStore(state => state.startStep)
	const completeStep = useStore(state => state.completeStep)
	const reset = useStore(state => state.reset)

	return {
		txStatus,
		activeStep,
		approval,
		bridge,

		setTxStatus,
		setStepStatus,
		setActiveStep,
		getActiveStep,

		startStep,
		completeStep,
		reset,
	}
}
