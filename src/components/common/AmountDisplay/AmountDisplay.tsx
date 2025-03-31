import type { FC } from 'react';
import { useFormStore } from '@/stores/form/useFormStore';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import { useGetFees } from '@/hooks/useGetFees';
import { formatEther } from 'viem';
import './AmountDisplay.pcss';

export const AmountDisplay: FC = () => {
    const { fromAmount, isLoading: isFormLoading, error } = useFormStore();
    const { fee, isLoading: isFeeLoading } = useGetFees();

    const calculateToAmount = (): string => {
        if (error || !fromAmount || Number(fromAmount) === 0) {
            return '0';
        }

        const rawAmount = BigInt(Number(fromAmount) * 10 ** 18);
        const toAmount = rawAmount - BigInt(fee as bigint);
        const formattedAmount = formatEther(toAmount);

        return formattedAmount;
    };

    return (
        <div className="amount-display">
            {isFormLoading || isFeeLoading ? (
                <SkeletonLoader height={36} width={128} />
            ) : (
                <input
                    type="text"
                    className="amount-display__input"
                    placeholder="0.000"
                    value={calculateToAmount()}
                    readOnly
                />
            )}
        </div>
    );
};