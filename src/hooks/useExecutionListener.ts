import { type IRouteType, type IRouteStep, Status, StepType } from '@lanca/sdk';
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore';

const isRouteStep = (step: any): step is IRouteStep => {
    return (step as IRouteStep).to !== undefined;
};

export const useExecutionListener = () => {
    const { setStepStatus, setReceivedAmount } = useTxExecutionStore();

    const handleExecutionUpdate = (state: IRouteType) => {
        state.steps.forEach(step => {
            if (step.execution && step.execution.status) {
                setStepStatus(step.type, step.execution.status);

                if (step.execution.status === Status.SUCCESS && step.type === StepType.BRIDGE && isRouteStep(step)) {
                    setReceivedAmount(step.to.amount);
                }
            }
        });
    };

    return handleExecutionUpdate;
};