import type { FC } from 'react'
import { useMemo, memo } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { formatTokenAmount } from '@/utils/tokens'
import './AmountDisplay.pcss'

export const AmountDisplay: FC = memo(() => {
	const { fromAmount, isLoading, error } = useFormStore()

	const displayAmount = useMemo(() => {
		if (error || !fromAmount || fromAmount === '0') {
			return '0'
		}
		return Number(formatTokenAmount(fromAmount, 6)) * (1 - 0.007)
	}, [fromAmount, error])

	const inputClass = useMemo(() => {
		const baseClass = 'amount_display_input'
		return displayAmount && displayAmount !== '0' ? `${baseClass} amount_display_has_value` : baseClass
	}, [displayAmount])

	return (
		<div className="amount_display">
			{isLoading ? (
				<SkeletonLoader height={58} width={128} />
			) : (
				<input
					type="text"
					className={inputClass}
					placeholder="0"
					value={displayAmount}
					readOnly
					aria-label="Token amount"
				/>
			)}
		</div>
	)
})
