import { useContext } from 'react';
import { TxExecutionContext } from './TxExecutionContext';

export const useTxExecutionStore = () => {
    const useStore = useContext(TxExecutionContext);

    if (!useStore) {
        throw new Error(`You forgot to wrap your component in <TxExecutionStoreProvider>.`);
    }

    const txStatus = useStore(state => state.txStatus);
    const steps = useStore(state => state.steps);
    const receivedAmount = useStore(state => state.receivedAmount);

    const setStepStatus = useStore(state => state.setStepStatus);
    const setReceivedAmount = useStore(state => state.setReceivedAmount); 
    const reset = useStore(state => state.reset);

    return {
        txStatus,
        steps,
        receivedAmount, 
        setStepStatus,
        setReceivedAmount, 
        reset,
    };
};