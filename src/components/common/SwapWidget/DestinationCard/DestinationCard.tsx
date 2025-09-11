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
	const { toBalance, toBalanceLoading: isLoading } = useBalancesStore()
	const { openDstAssetModal } = useModalStore()

	const handleOpenModal = useCallback(() => {
		openDstAssetModal()
	}, [openDstAssetModal])

	const token = useMemo(() => {
		if (!destinationChain || !toBalance) {
			return { balance: '0', decimals: 6, symbol: 'USDC' }
		}
		return { balance: toBalance, decimals: 6, symbol: 'USDC' }
	}, [destinationChain, toBalance])

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
