import type { FC } from 'react'
import { useMemo } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { formatTokenAmount } from '@/utils/tokens'
import './AmountDisplay.pcss'

export const AmountDisplay: FC = () => {
	const { fromAmount, isLoading, error } = useFormStore()

	const displayAmount = useMemo(() => {
		if (error || !fromAmount || fromAmount === '0') {
			return '0'
		}
		return formatTokenAmount(fromAmount)
	}, [fromAmount, error])

	return (
		<div className="amount-display">
			{isLoading ? (
				<SkeletonLoader height={58} width={128} />
			) : (
				<input type="text" className="amount-display__input" placeholder="0" value={displayAmount} readOnly />
			)}
		</div>
	)
}
