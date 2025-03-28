import type { FC } from 'react'
import type { Chain as IChain } from '@/stores/chains/types'
import { ChainItem } from '../ChainItem/ChainItem'
import { useGetChains } from '@/hooks/useGetChains'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { ActiveTab } from '../types'
import { formatTokenAmount } from '@/utils/tokens'
import { useAccount } from 'wagmi'
import './ChainMenu.pcss'

type ChainMenuProps = {
	activeTab: ActiveTab
	searchInput: string
	onSelectChain: (chain: IChain) => void
}

export const ChainMenu: FC<ChainMenuProps> = ({ activeTab, searchInput, onSelectChain }): JSX.Element => {
	const { isConnected } = useAccount()
	const { allChains, ccipChains } = useGetChains()
	const { balances, isLoading } = useBalancesStore()

	const chainsToDisplay = activeTab === ActiveTab.CCIP ? ccipChains : allChains

	const filteredChains = chainsToDisplay
		.filter(chain => chain.name.toLowerCase().includes(searchInput.toLowerCase()))
		.map(chain => ({
			...chain,
			balance: isConnected ? formatTokenAmount(balances[Number(chain.id)]?.balance || '0') : undefined,
		}))

	if (isConnected) {
		filteredChains.sort((a, b) => parseFloat(b.balance || '0') - parseFloat(a.balance || '0'))
	}

	return (
		<div className="scroll-content">
			<div className="chain-menu">
				{filteredChains.map(chain => (
					<ChainItem
						key={chain.id}
						chain={chain}
						balance={chain.balance}
						onSelectChain={onSelectChain}
						isLoading={isLoading}
					/>
				))}
			</div>
		</div>
	)
}
