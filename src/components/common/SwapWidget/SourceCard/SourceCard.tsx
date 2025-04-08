import type { FC } from 'react'
import { useCallback, useMemo, memo } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { useFormStore } from '@/stores/form/useFormStore'
import { AmountInput } from '../../AmountInput/AmountInput'
import { BalanceDisplay } from '../../BalanceDisplay/BalanceDisplay'
import { ErrorDisplay } from '../../ErrorDisplay/ErrorDisplay'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useModalStore } from '@/stores/modals/useModalsStore'
import './SourceCard.pcss'

export const SourceCard: FC = memo((): JSX.Element => {
    const { sourceChain, error } = useFormStore()
    const { balances, isLoading } = useBalancesStore()
    const { openSrcAssetModal } = useModalStore()

    const handleOpenModal = useCallback(() => {
        openSrcAssetModal()
    }, [openSrcAssetModal])

    const token = useMemo(() => {
        if (!sourceChain || !balances[Number(sourceChain.id)]) {
            return { balance: '0', decimals: 18, symbol: 'tCERO' }
        }
        return balances[Number(sourceChain.id)]
    }, [sourceChain, balances])

    return (
        <div className="source_card_wrapper">
            <div className="source_card" data-testid="source-card">
                <ChainSelector chain={sourceChain} openModal={handleOpenModal} />
                <AmountInput />
                {error ? (
                    <ErrorDisplay error={error} />
                ) : (
                    <BalanceDisplay balance={token.balance} isLoading={isLoading} showMax />
                )}
            </div>
        </div>
    )
})