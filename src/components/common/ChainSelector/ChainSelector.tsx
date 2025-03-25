import type { FC } from 'react'
import type { Chain } from '@/stores/chains/types'
import { Badge } from '../Badge/Badge'
import { RightIcon } from '@/assets/icons/right'
import './ChainSelector.pcss'

const TokenDisplay: FC = (): JSX.Element => {
	return (
		<div className="chain-selector__token">
			<Badge logoURL="/Token/tLNC.svg" size="m" />
			<p className="chain-selector__token-name">tLNC</p>
		</div>
	)
}

type ChainDisplayProps = {
	chain: Chain | null
}

const ChainDisplay: FC<ChainDisplayProps> = ({ chain }): JSX.Element => {
	return (
		<div className="chain-selector__chain">
			<Badge logoURL={chain?.logoURL} size="m" />
			<p className="chain-selector__chain-name">{chain?.name}</p>
		</div>
	)
}

type ChainSelectorProps = {
	openModal: () => void
	chain: Chain | null
}

export const ChainSelector: FC<ChainSelectorProps> = ({ chain, openModal }): JSX.Element => {
	return (
		<div className="chain-selector" onClick={openModal}>
			<TokenDisplay />
			<p className="chain-selector__pointer">on</p>
			<ChainDisplay chain={chain} />
			<RightIcon />
		</div>
	)
}
