import { useContext } from 'react'
import { TxExecutionContext } from './TxExecutionContext'

export const useTxExecutionStore = () => {
	const useStore = useContext(TxExecutionContext)

	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <TxExecutionStoreProvider>.`)
	}

	const txStatus = useStore(state => state.txStatus)
	const activeStep = useStore(state => state.activeStep)
	const steps = useStore(state => state.steps)
	const error = useStore(state => state.error)

	const setTxStatus = useStore(state => state.setTxStatus)
	const setStepStatus = useStore(state => state.setStepStatus)
	const setActiveStep = useStore(state => state.setActiveStep)
	const appendStep = useStore(state => state.appendStep)
	const updateStep = useStore(state => state.updateStep)
	const setError = useStore(state => state.setError)
	const reset = useStore(state => state.reset)

	return {
		txStatus,
		activeStep,
		steps,
		error,
		setTxStatus,
		setStepStatus,
		setActiveStep,
		appendStep,
		updateStep,
		setError,
		reset,
	}
}
