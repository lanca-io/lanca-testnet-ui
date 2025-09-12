import type { FC } from 'react'
import type { Chain } from '@/stores/chains/types'
import { memo, useCallback } from 'react'
import { SkeletonLoader } from '../../SkeletonLoader/SkeletonLoader'
import { Badge } from '../../Badge/Badge'
import { format } from '@/utils/format'
import './ChainItem.pcss'

type ChainProps = {
	chain: Chain
	balance?: string
	onSelectChain: (chain: Chain) => void
	isLoading: boolean
}

export const ChainItem: FC<ChainProps> = memo(({ chain, balance, onSelectChain, isLoading }): JSX.Element => {
	const handleClick = useCallback(() => {
		onSelectChain(chain)
	}, [chain, onSelectChain])

	const displayBalance = !isLoading && balance && Number(balance) > 0

	console.log(balance)

	return (
		<div className="chain" onClick={handleClick} data-testid={`chain-item-${chain.id}`}>
			<div className="chain_content">
				<Badge logoURL={chain.logoURL} size="l" />
				<div className="chain_details">
					<p className="chain_name">{chain.name}</p>
				</div>
			</div>
			<div className="chain_balance">
				{isLoading ? (
					<SkeletonLoader width={30} height={16} />
				) : (
					displayBalance && <p className="chain_balance_value">{Number(balance)}</p>
				)}
			</div>
		</div>
	)
})
