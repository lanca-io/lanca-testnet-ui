import type { FC } from 'react';
import { Approval } from './Approval/Approval';
import { Bridge } from './Bridge/Bridge';
import { Failure } from './Failure/Failure';
import { Success } from './Success/Success';
import { useTxProcess } from '@/hooks/useTxProcess';
import { Status, StepType } from '@lanca/sdk';
import './ProcessContent.pcss';

export const ProcessContent: FC = (): JSX.Element | null => {
    const { txStatus, currentStep } = useTxProcess(); 

    const content = (() => {
        switch (txStatus) {
            case Status.FAILED:
            case Status.REJECTED:
                return <Failure />;
            case Status.SUCCESS:
                return <Success />;
            case Status.PENDING:
                if (currentStep === StepType.ALLOWANCE) return <Approval />;
                if (currentStep === StepType.BRIDGE) return <Bridge />;
                return null;
            default:
                return null;
        }
    })();

    return <div className="process-content">{content}</div>;
};