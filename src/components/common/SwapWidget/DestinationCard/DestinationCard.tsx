import type { FC } from 'react'
import type { Address } from 'viem'
import { useState, useCallback } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { AmountDisplay } from '../../AmountDisplay/AmountDisplay'
import { useFormStore } from '@/stores/form/useFormStore'
import { TxInfo } from '../../TxInfo/TxInfo'
import { AssetModal } from '../../AssetModal/AssetModal'
import { Chain } from '@/stores/chains/types'
import { tokenAddresses } from '@/configuration/addresses'
import './DestinationCard.pcss'


export const DestinationCard: FC = (): JSX.Element => {
    const { destinationChain, setDestinationChain, setToTokenAddress } = useFormStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])
    const handleSelectChain = useCallback((chain: Chain) => {
        setDestinationChain(chain)
        const tokenAddress = tokenAddresses[chain.id]
        setToTokenAddress(tokenAddress as Address)
        closeModal()
    }, [setDestinationChain, setToTokenAddress, closeModal])


    return (
        <div className="destination-card-wrapper">
            <div className="destination-card">
                <ChainSelector chain={destinationChain} openModal={openModal} />
                <AmountDisplay />
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