import type { FC } from 'react'
import type { Address } from 'viem'
import type { Chain } from '@/stores/chains/types'
import { useState, useCallback, useMemo } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { AmountDisplay } from '../../AmountDisplay/AmountDisplay'
import { useFormStore } from '@/stores/form/useFormStore'
import { TxInfo } from '../../TxInfo/TxInfo'
import { AssetModal } from '../../AssetModal/AssetModal'
import { TokenAddresses } from '@/configuration/addresses'
import { BalanceDisplay } from '../../BalanceDisplay/BalanceDisplay'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import './DestinationCard.pcss'

export const DestinationCard: FC = (): JSX.Element => {
    const { destinationChain, setDestinationChain, setToTokenAddress } = useFormStore()
    const { balances, isLoading } = useBalancesStore() 
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])
    const handleSelectChain = useCallback((chain: Chain) => {
        setDestinationChain(chain)
        const tokenAddress = TokenAddresses[chain.id]
        setToTokenAddress(tokenAddress as Address)
        closeModal()
    }, [setDestinationChain, setToTokenAddress, closeModal])

        const token = useMemo(() => {
            if (!destinationChain || !balances[Number(destinationChain.id)]) {
                return { balance: '0', decimals: 18, symbol: 'tCERO' }
            }
            return balances[Number(destinationChain.id)]
        }, [destinationChain, balances])


    return (
        <div className="destination-card-wrapper">
            <div className="destination-card">
                <ChainSelector chain={destinationChain} openModal={openModal} />
                <AmountDisplay />
                <BalanceDisplay 
                    balance={token.balance} 
                    isLoading={isLoading} 
                    showMax={false}

                />
                <TxInfo />
                <AssetModal
                    isOpen={isModalOpen}
                    title="Select Chain"
                    onClose={closeModal}
                    onChainSelect={handleSelectChain}
                />
            </div>
        </div>
    )
}