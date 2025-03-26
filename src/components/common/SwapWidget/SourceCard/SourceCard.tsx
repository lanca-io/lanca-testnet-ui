import { FC, useState } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { useFormStore } from '@/stores/form/useFormStore'
import { AmountInput } from '../../AmountInput/AmountInput'
import { AssetModal } from '../../AssetModal/AssetModal'
import './SourceCard.pcss'

export const SourceCard: FC = (): JSX.Element => {
    const { sourceChain } = useFormStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="source-card-wrapper">
            <div className="source-card">
                <ChainSelector chain={sourceChain} openModal={openModal} />
                <AmountInput />
                <AssetModal isOpen={isModalOpen} title="Select Chain" onClose={closeModal} />
            </div>
        </div>
    )
}