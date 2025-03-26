import type { FC } from 'react'
import type { Chain } from '@/stores/chains/types'
import { Badge } from '../Badge/Badge'
import { Tag } from '@concero/ui-kit'
import { RightIcon } from '@/assets/icons/right'
import { useMemo } from 'react'
import './ChainSelector.pcss'

type ChainDisplayProps = {
    chain: Chain | null
}

type ChainSelectorProps = {
    openModal: () => void
    chain: Chain | null
}

const TokenDisplay: FC = (): JSX.Element => {
    return (
        <div className="chain-selector__token">
            <Badge logoURL="/Token/tCERO.svg" size="m" />
            <p className="chain-selector__token-name">tCERO</p>
        </div>
    )
}

const ChainDisplay: FC<ChainDisplayProps> = ({ chain }): JSX.Element => {
    return (
        <div className="chain-selector__chain">
            <Badge logoURL={chain?.logoURL} size="m" />
            <p className="chain-selector__chain-name">{chain?.name}</p>
        </div>
    )
}


export const ChainSelector: FC<ChainSelectorProps> = ({ chain, openModal }): JSX.Element => {
    const tokenDisplay = useMemo(() => <TokenDisplay />, [])
    const chainDisplay = useMemo(() => <ChainDisplay chain={chain} />, [chain])
	const icon = useMemo(() => <RightIcon />, [])

    return (
        <div className="chain-selector" onClick={openModal}>
            {tokenDisplay}
            <p className="chain-selector__pointer">on</p>
            {chainDisplay}
            {icon}
        </div>
    )
}