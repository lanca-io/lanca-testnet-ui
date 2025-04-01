import { useMemo } from 'react';
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore';
import { Status, StepType } from '@lanca/sdk';

export const useTxProcess = () => {
    const { txStatus, steps } = useTxExecutionStore();

    const currentStage = useMemo(() => {
        switch (txStatus) {
            case Status.SUCCESS:
                return 'success';
            case Status.FAILED:
                return 'failed';
            case Status.REJECTED:
                return 'rejected';
            case Status.PENDING:
                return 'pending';
            default:
                return 'not_started';
        }
    }, [txStatus]);

    const currentStep = useMemo(() => {
        switch (true) {
            case steps.ALLOWANCE === Status.PENDING:
                return StepType.ALLOWANCE;
            case steps.BRIDGE === Status.PENDING:
                return StepType.BRIDGE;
            default:
                return null;
        }
    }, [steps]);

    const isTerminalStage = useMemo(() => {
        return ['success', 'failed', 'rejected'].includes(currentStage);
    }, [currentStage]);

    return {
        txStatus,        
        currentStage,   
        currentStep,    
        isTerminalStage
    };
};