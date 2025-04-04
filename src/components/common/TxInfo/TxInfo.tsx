import type { FC } from 'react'
import { memo } from 'react'
import { GasIcon } from '@/assets/icons/gas'
import { TimeIcon } from '@/assets/icons/time'
import { useEstimateGas } from '@/hooks/useEstimateGas'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { format } from '@/utils/format'
import './TxInfo.pcss'

export const TxInfo: FC = memo((): JSX.Element => {
	const { formattedGas, isLoading } = useEstimateGas()

	return (
		<div className="tx_info" data-testid="tx-info">
			<div className="tx_info_item">
				<div className="tx_info_item_label">
					<GasIcon color="var(--color-gray-500)" size={16} />
					<p className="tx_info_item_text">Test gas</p>
				</div>
				<div className="tx_info_item_value">
					{isLoading ? (
						<SkeletonLoader width={55} height={20} />
					) : (
						<p className="tx_info_item_text_value" data-testid="gas-value">
							{format(Number(formattedGas), 4)}
						</p>
					)}
				</div>
			</div>
			<div className="tx_info_item">
				<div className="tx_info_item_label">
					<TimeIcon />
					<p className="tx_info_item_text">ETA</p>
				</div>
				<div className="tx_info_item_value">
					<p className="tx_info_item_text_value">20s</p>
				</div>
			</div>
		</div>
	)
})

TxInfo.displayName = 'TxInfo'
