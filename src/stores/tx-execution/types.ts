import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional';
import type { StoreApi } from 'zustand/vanilla';
import { Status, StepType } from '@lanca/sdk';

export type TxExecutionState = {
    steps: {
        ALLOWANCE: Status;
        BRIDGE: Status;
    };
    txStatus: Status;
    receivedAmount: string | null;
};

export interface TxExecutionActions {
    setStepStatus: (stepType: StepType, status: Status) => void;
    setReceivedAmount: (amount: string) => void;
    reset: () => void;
}

export type TxExecutionStateAndActions = TxExecutionState & TxExecutionActions;

export type TxExecutionStore = UseBoundStoreWithEqualityFn<StoreApi<TxExecutionStateAndActions>>;