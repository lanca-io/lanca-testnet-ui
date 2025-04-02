import type { TxExecutionStateAndActions, TxExecutionStore } from './types';
import { createWithEqualityFn } from 'zustand/traditional';
import { Status, StepType } from '@lanca/sdk';

const initialState = {
    txStatus: Status.NOT_STARTED,
    steps: {
        ALLOWANCE: Status.NOT_STARTED,
        BRIDGE: Status.NOT_STARTED,
    },
    receivedAmount: null as string | null, 
};

const computeTxStatus = (steps: { ALLOWANCE: Status; BRIDGE: Status }): Status => {
    const statuses = Object.values(steps);

    switch (true) {
        case statuses.includes(Status.REJECTED):
            return Status.REJECTED;

        case statuses.includes(Status.FAILED):
            return Status.FAILED;

        case statuses.every(status => status === Status.SUCCESS):
            return Status.SUCCESS;

        case statuses.some(status => status === Status.PENDING):
            return Status.PENDING;

        default:
            return Status.NOT_STARTED;
    }
};

export const CreateTxExecutionStore = (): TxExecutionStore => {
    return createWithEqualityFn<TxExecutionStateAndActions>(
        (set, get) => ({
            ...initialState,

            setStepStatus: (stepType: StepType, status: Status) => {
                if (stepType === StepType.ALLOWANCE || stepType === StepType.BRIDGE) {
                    set(state => ({
                        steps: {
                            ...state.steps,
                            [stepType]: status,
                        },
                    }));

                    const { steps } = get();
                    const overallStatus = computeTxStatus(steps);
                    set({ txStatus: overallStatus });
                    if (overallStatus !== Status.SUCCESS) {
                        set({ receivedAmount: null });
                    }
                }
            },

            setReceivedAmount: (amount: string) => {
                set({ receivedAmount: amount });
            },

            reset: () => {
                set(initialState);
            },
        }),
        Object.is,
    );
};