import { FC, useState } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { AmountDisplay } from '../../AmountDisplay/AmountDisplay'
import { useFormStore } from '@/stores/form/useFormStore'
import { TxInfo } from '../../TxInfo/TxInfo'
import { AssetModal } from '../../AssetModal/AssetModal'
import './DestinationCard.pcss'

export const DestinationCard: FC = (): JSX.Element => {
    const { destinationChain } = useFormStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="destination-card-wrapper">
            <div className="destination-card">
                <ChainSelector chain={destinationChain} openModal={openModal} />
                <AmountDisplay />
                <TxInfo />
                <AssetModal isOpen={isModalOpen} title="Select Chain" onClose={closeModal} />
            </div>
        </div>
    )
}