import type { FC } from 'react'
import { useMemo, memo } from 'react'
import { Badge } from '@/components/common/Badge/Badge'
import { useFormStore } from '@/stores/form/useFormStore'
import { formatTokenAmount } from '@/utils/tokens'
import { ClockIcon } from '@/assets/icons/clock'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import './Success.pcss'

export const Success: FC = memo((): JSX.Element => {
	const { executionTime } = useTxExecutionStore()
	const { destinationChain, fromAmount } = useFormStore()

	const formattedAmount = useMemo(() => {
		if (!fromAmount || fromAmount === '0') return '0'
		return formatTokenAmount(fromAmount)
	}, [fromAmount])

	const imageSrc = '/Swap/Success.svg'
	const altText = 'Success Process'
	const headingText = 'You received'

	return (
		<>
			<div className="success">
				<img src={imageSrc} alt={altText} className="success_image" data-testid="success-image" />
			</div>
			<div className="success_info">
				<div className="success_info_heading">
					<h5 className="success_info_text">{headingText}</h5>
				</div>
				<div className="success_info_stats">
					<div className="success_info_details">
						<div className="success_info_token">
							<Badge logoURL="/Token/tCERO.svg" size="m" />
							<p className="success_info_name">tCERO</p>
						</div>
						<p className="success_info_pointer">on</p>
						<div className="success_info_chain">
							<Badge logoURL={destinationChain?.logoURL} size="m" />
							<p className="success_info_name">{destinationChain?.name}</p>
						</div>
					</div>
					<p className="success_info_number" data-testid="success-amount">
						{formattedAmount}
					</p>
					<div className="success_info_timer">
						<ClockIcon />
						<p className="success_info_timer_text">{`In ${executionTime} seconds`}</p>
					</div>
				</div>
			</div>
		</>
	)
})
