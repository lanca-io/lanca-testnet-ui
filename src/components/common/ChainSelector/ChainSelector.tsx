import type { FC } from 'react'
import type { Chain } from '@/stores/chains/types'
import { Badge } from '../Badge/Badge'
import { RightIcon } from '@/assets/icons/right'
import { useMemo, memo } from 'react'
import './ChainSelector.pcss'

type ChainDisplayProps = {
	chain: Chain | null
}

type ChainSelectorProps = {
	openModal: () => void
	chain: Chain | null
}

const TokenDisplay: FC = memo((): JSX.Element => {
	return (
		<div className="chain_selector_token">
			<Badge logoURL="/Token/tCERO.svg" size="m" />
			<p className="chain_selector_token_name">tCERO</p>
		</div>
	)
})

const ChainDisplay: FC<ChainDisplayProps> = memo(({ chain }): JSX.Element => {
	return (
		<div className="chain_selector_chain">
			<Badge logoURL={chain?.logoURL} size="m" />
			<p className="chain_selector_chain_name">{chain?.name}</p>
		</div>
	)
})

export const ChainSelector: FC<ChainSelectorProps> = memo(({ chain, openModal }): JSX.Element => {
	const tokenDisplay = useMemo(() => <TokenDisplay />, [])
	const chainDisplay = useMemo(() => <ChainDisplay chain={chain} />, [chain])
	const icon = useMemo(() => <RightIcon />, [])

	return (
		<div className="chain_selector" onClick={openModal}>
			{tokenDisplay}
			<p className="chain_selector_pointer">on</p>
			{chainDisplay}
			{icon}
		</div>
	)
})
