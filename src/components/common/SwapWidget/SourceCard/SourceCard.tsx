import type { FC } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { useFormStore } from '@/stores/form/useFormStore'
import { AmountInput } from '../../AmountInput/AmountInput'
import './SourceCard.pcss'

export const SourceCard: FC = (): JSX.Element => {
    const { sourceChain } = useFormStore()
    return (
        <div className="source-card-wrapper">
            <div className="source-card">
                <ChainSelector chain={sourceChain} openModal={() => {}} />
				<AmountInput/>
            </div>
        </div>
    )
}