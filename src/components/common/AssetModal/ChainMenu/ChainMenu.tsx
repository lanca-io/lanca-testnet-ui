import type { FC } from 'react'
import type { Direction } from '../types'
import type { ConceroChain } from '@/stores/chains/types'
import { memo, useMemo } from 'react'
import { ChainItem } from '../ChainItem/ChainItem'
import { useGetChains } from '@/hooks/useGetChains'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { ActiveTab } from '../types'
import { formatTokenAmount } from '@/utils/tokens'
import { useAccount } from 'wagmi'
import { useFormStore } from '@/stores/form/useFormStore'
import './ChainMenu.pcss'

type ChainMenuProps = {
    activeTab: ActiveTab
    searchInput: string
    onSelectChain: (chain: ConceroChain) => void
    direction: Direction
}

export const ChainMenu: FC<ChainMenuProps> = memo(
    ({ activeTab, searchInput, direction, onSelectChain }): JSX.Element => {
        const { isConnected } = useAccount()
        const { allChains } = useGetChains()
        const { sourceChain, destinationChain } = useFormStore()
        const { balances, isLoading } = useBalancesStore()

        const filteredChains = useMemo(() => {
            const chains = allChains

            const excludeId = direction === 'from' ? destinationChain?.id : sourceChain?.id

            return chains
                .filter(chain => chain.id !== excludeId)
                .filter(chain => chain.name.toLowerCase().includes(searchInput.toLowerCase()))
                .map(chain => ({
                    ...chain,
                    balance: isConnected ? formatTokenAmount(balances[Number(chain.id)]?.balance || '0', 6) : undefined,
                }))
                .sort((a, b) => (isConnected ? parseFloat(b.balance || '0') - parseFloat(a.balance || '0') : 0))
        }, [
            activeTab,
            allChains,
            searchInput,
            isConnected,
            balances,
            direction,
            sourceChain,
            destinationChain,
        ])

        return (
            <div className="scroll_content">
                <div className="chain_menu">
                    {filteredChains.length > 0 ? (
                        filteredChains.map((chain: any) => (
                            <ChainItem
                                key={chain.id}
                                chain={chain}
                                balance={chain.balance}
                                onSelectChain={onSelectChain}
                                isLoading={isLoading}
                            />
                        ))
                    ) : (
                        <div className="chain_menu_empty">
                            <p>No chains found</p>
                        </div>
                    )}
                </div>
            </div>
        )
    },
)
