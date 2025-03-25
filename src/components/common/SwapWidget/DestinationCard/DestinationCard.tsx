import type { FC } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { AmountDisplay } from '../../AmountDisplay/AmountDisplay'
import { useFormStore } from '@/stores/form/useFormStore'
import { TxInfo } from '../../TxInfo/TxInfo'
import './DestinationCard.pcss'


export const DestinationCard: FC = (): JSX.Element => {
    const { destinationChain } = useFormStore()
    return (
        <div className="destination-card-wrapper">
            <div className="destination-card">
                <ChainSelector chain={destinationChain} openModal={() => {}} />
                <AmountDisplay/>
                <TxInfo/>
            </div>
        </div>
    )
}