import type { FC } from 'react'
import { memo, useMemo } from 'react'
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

export const ChainMenu: FC<ChainMenuProps> = memo(({ activeTab, searchInput, onSelectChain }): JSX.Element => {
	const { isConnected } = useAccount()
	const { allChains, ccipChains } = useGetChains()
	const { balances, isLoading } = useBalancesStore()

	const filteredChains = useMemo(() => {
		const chainsToDisplay = activeTab === ActiveTab.CCIP ? ccipChains : allChains

		const filtered = chainsToDisplay
			.filter(chain => chain.name.toLowerCase().includes(searchInput.toLowerCase()))
			.map(chain => ({
				...chain,
				balance: isConnected ? formatTokenAmount(balances[Number(chain.id)]?.balance || '0') : undefined,
			}))

		if (isConnected) {
			filtered.sort((a, b) => parseFloat(b.balance || '0') - parseFloat(a.balance || '0'))
		}

		return filtered
	}, [activeTab, ccipChains, allChains, searchInput, isConnected, balances])

	return (
		<div className="scroll_content">
			<div className="chain_menu">
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
})
