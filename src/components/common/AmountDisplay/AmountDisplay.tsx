import type { FC } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import './AmountDisplay.pcss'

export const AmountDisplay: FC = () => {
    const { fromAmount, isLoading } = useFormStore()

    const calculateToAmount = (amount: string): string => {
        const fees = 0.01
        const toAmount = (parseFloat(amount) - fees).toFixed(2)
        return isNaN(parseFloat(toAmount)) || parseFloat(toAmount) < 0 ? '0' : toAmount
    }

    return (
        <div className='amount-display'>
            {isLoading ? (
                <SkeletonLoader height={36} width={128} />
            ) : (
                <input
                    type="text"
                    className="amount-display__input"
                    placeholder="0"
                    value={calculateToAmount(fromAmount)}
                    readOnly
                />
            )}
        </div>
    )
}