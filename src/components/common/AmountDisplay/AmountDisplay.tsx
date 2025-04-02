import type { FC } from 'react'
import { useMemo } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { useGetFees } from '@/hooks/useGetFees'
import { formatEther } from 'viem'
import './AmountDisplay.pcss'

export const AmountDisplay: FC = () => {
    const { fromAmount, isLoading: isFormLoading, error } = useFormStore()
    const { fee, isLoading: isFeeLoading } = useGetFees()

    const toAmount = useMemo(() => {
        if (error || !fromAmount || fromAmount === '0') {
            return '0'
        }

        try {
            const fromAmountBigInt = BigInt(fromAmount)
            const feeBigInt = BigInt(fee || '0')
            
            const toAmountBigInt = fromAmountBigInt > feeBigInt ? 
                fromAmountBigInt - feeBigInt : BigInt(0)
                
            return formatEther(toAmountBigInt)
        } catch (err) {
            return '0'
        }
    }, [fromAmount, fee, error])

    const isLoading = (isFormLoading || isFeeLoading) && !error

    return (
        <div className="amount-display">
            {isLoading ? (
                <SkeletonLoader height={58} width={128} />
            ) : (
                <input
                    type="text"
                    className="amount-display__input"
                    placeholder="0"
                    value={toAmount}
                    readOnly
                />
            )}
        </div>
    )
}