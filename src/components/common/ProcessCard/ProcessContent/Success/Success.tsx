import type { FC } from 'react';
import { useMemo } from 'react';
import { Badge } from '@/components/common/Badge/Badge';
import { useFormStore } from '@/stores/form/useFormStore';
import { ClockIcon } from '@/assets/icons/clock';
import './Success.pcss';

export const Success: FC = (): JSX.Element => {
    const { destinationChain } = useFormStore();
    const imageSrc = useMemo(() => '/Swap/Success.svg', []);
    const altText = useMemo(() => 'Success Process', []);
    const headingText = useMemo(() => 'You received', []);

    return (
        <>
            <div className="success">
                <img src={imageSrc} alt={altText} className="success__image" />
            </div>
            <div className="success-info">
                <div className="success-info__heading">
                    <h5 className="success-info__text">{headingText}</h5>
                </div>
                <div className="success-info__stats">
                    <div className="success-info__details">
                        <div className="success-info__token">
                            <Badge logoURL="/Token/tCERO.svg" size="m" />
                            <p className="success-info__name">tCERO</p>
                        </div>
                        <p className="success-info__pointer">on</p>
                        <div className="success-info__chain">
                            <Badge logoURL={destinationChain?.logoURL} size="m" />
                            <p className="success-info__name">{destinationChain?.name}</p>
                        </div>
                    </div>
                    <p className="success-info__number">1</p>
                    <div className='success-info__timer'>
                        <ClockIcon />
                        <p className="success-info__timer-text">In 40 seconds</p>
                    </div>
                </div>
            </div>
        </>
    );
};