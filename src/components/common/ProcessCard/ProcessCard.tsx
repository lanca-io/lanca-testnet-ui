import type { FC } from 'react';
import { ProcessHeading } from './ProcessHeading/ProcessHeading';
import { ProcessContent } from './ProcessContent/ProcessContent';
import { TxProgress } from '../TxProgress/TxProgress';
import { ProcessInfo } from './ProcessInfo/ProcessInfo';
import { ProcessAction } from './ProcessAction/ProcessAction';
import { useTxProcess } from '@/hooks/useTxProcess';
import './ProcessCard.pcss';

export const ProcessCard: FC = (): JSX.Element => {
    const { currentStage } = useTxProcess();

    return (
        <>
            <div className={`process-card__${currentStage}`}>
                <div className="process-card">
                    <ProcessHeading />
                    <ProcessContent />
                    <TxProgress />
                    <ProcessInfo />
                </div>
            </div>
            <ProcessAction />
        </>
    );
};