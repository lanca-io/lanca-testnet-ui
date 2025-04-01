import type { FC } from 'react';
import { IconButton } from '@concero/ui-kit';
import { LeftIcon } from '@/assets/icons/left';
import { useTxProcess } from '@/hooks/useTxProcess';
import { useProcessHeading } from '@/hooks/useProcessHeading';
import './ProcessHeading.pcss';

export const ProcessHeading: FC = () => {
    const { isTerminalStage } = useTxProcess(); 
    const heading = useProcessHeading();

    return (
        <div className={`process-card__heading ${!isTerminalStage ? 'process-card__heading__no__button' : ''}`}>
            {isTerminalStage && (
                <IconButton onClick={() => {}} variant="secondary" size="m">
                    <LeftIcon />
                </IconButton>
            )}
            <h4 className="process-card__title">{heading}</h4>
        </div>
    );
};