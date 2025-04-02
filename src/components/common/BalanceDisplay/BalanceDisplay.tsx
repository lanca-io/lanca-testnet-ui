import type { FC } from 'react'
import { useMemo, useCallback } from 'react'
import { format } from '@/utils/format'
import { formatTokenAmount } from '@/utils/tokens'
import { useAccount } from 'wagmi'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { useFormStore } from '@/stores/form/useFormStore'
import './BalanceDisplay.pcss'

type BalanceDisplayProps = {
	balance: string
	isLoading: boolean
	showMax: boolean
}

export const BalanceDisplay: FC<BalanceDisplayProps> = ({ balance, showMax, isLoading }): JSX.Element | null => {
	const { isConnected } = useAccount()
	const { setFromAmount } = useFormStore()

	const formattedBalance = useMemo(() => formatTokenAmount(balance), [balance])

	const handleMax = useCallback(() => {
		setFromAmount(balance)
	}, [balance, setFromAmount])

	if (!isConnected) return null

	return (
		<div className="balance-display">
			{isLoading ? (
				<SkeletonLoader width={111} height={24} className="display-loader" />
			) : (
				<>
					<span className="balance-display__title">Balance</span>
					<span className="balance-display__value">{format(Number(formattedBalance), 4)}</span>
					<span className="balance-display__symbol">tCERO</span>
					{showMax && Number(balance) > 0 && (
						<button onClick={handleMax} className="balance-display__button">
							Max
						</button>
					)}
				</>
			)}
		</div>
	)
}
