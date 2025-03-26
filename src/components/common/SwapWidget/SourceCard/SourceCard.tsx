import type { FC } from 'react'
import type { Address } from 'viem'
import type { Chain } from '@/stores/chains/types'
import { useState, useCallback } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { useFormStore } from '@/stores/form/useFormStore'
import { AmountInput } from '../../AmountInput/AmountInput'
import { AssetModal } from '../../AssetModal/AssetModal'
import { tokenAddresses } from '@/configuration/addresses'
import './SourceCard.pcss'

export const SourceCard: FC = (): JSX.Element => {
    const { sourceChain, setSourceChain, setFromTokenAddress } = useFormStore()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const openModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const handleSelectChain = useCallback((chain: Chain) => {
        setSourceChain(chain)
        const tokenAddress = tokenAddresses[chain.id]
        setFromTokenAddress(tokenAddress as Address)
        closeModal()
    }, [setSourceChain, closeModal])

    return (
        <div className="source-card-wrapper">
            <div className="source-card">
                <ChainSelector chain={sourceChain} openModal={openModal} />
                <AmountInput />
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