import type { FC } from 'react'
import { useCallback, useMemo, memo } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { AmountDisplay } from '../../AmountDisplay/AmountDisplay'
import { useFormStore } from '@/stores/form/useFormStore'
import { TxInfo } from '../../TxInfo/TxInfo'
import { BalanceDisplay } from '../../BalanceDisplay/BalanceDisplay'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useModalStore } from '@/stores/modals/useModalsStore'
import './DestinationCard.pcss'

export const DestinationCard: FC = memo((): JSX.Element => {
    const { destinationChain } = useFormStore()
    const { balances, isLoading } = useBalancesStore()
    const { openDstAssetModal } = useModalStore()

    const handleOpenModal = useCallback(() => {
        openDstAssetModal()
    }, [openDstAssetModal])

    const token = useMemo(() => {
        if (!destinationChain || !balances[Number(destinationChain.id)]) {
            return { balance: '0', decimals: 18, symbol: 'tCERO' }
        }
        return balances[Number(destinationChain.id)]
    }, [destinationChain, balances])

    return (
        <div className="destination_card_wrapper">
            <div className="destination_card" data-testid="destination-card">
                <ChainSelector chain={destinationChain} openModal={handleOpenModal} />
                <AmountDisplay />
                <BalanceDisplay balance={token.balance} isLoading={isLoading} showMax={false} />
                <TxInfo />
            </div>
        </div>
    )
})